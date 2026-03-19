<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import { usePreviewStore } from '@/stores/preview.store'
import { useDragStore } from '@/stores/drag.store'
import { useMjmlCompiler } from '@/composables/useMjmlCompiler'
import { useDragDrop } from '@/composables/useDragDrop'
import { useFlipAnimation } from '@/composables/useFlipAnimation'
import { ALLOWED_CHILDREN, type NodeType } from '@/types/node.types'
import { treeUtils } from '@/utils/treeUtils'
import { createNode } from '@/utils/defaultProps'
import CanvasIframe from '@/components/canvas/CanvasIframe.vue'
import SelectionBox from '@/components/canvas/SelectionBox.vue'
import DropZoneIndicator from '@/components/canvas/DropZoneIndicator.vue'
import DragGhost from '@/components/canvas/DragGhost.vue'

const editorStore = useEditorStore()
const previewStore = usePreviewStore()
const dragStore = useDragStore()
const { compiledHtml, mjmlSource } = useMjmlCompiler()
const { onDragEnd } = useDragDrop()
const { captureBeforeMove, playFlipAnimation, cancelFlip, isAnimating } = useFlipAnimation()

const iframeDoc = ref<Document | null>(null)
const canvasRef = ref<HTMLElement>()

const selectedRect = ref<{ top: number; left: number; width: number; height: number } | null>(null)
const hoveredRect = ref<{ top: number; left: number; width: number; height: number } | null>(null)

// Drop indicator state
const dropIndicatorVisible = ref(false)
const dropIndicatorY = ref(0)
const dropIndicatorX = ref(0)
const dropIndicatorWidth = ref(0)

// Resolved drop target
const resolvedDropParentId = ref<string | null>(null)
const resolvedDropIndex = ref(0)

function getIframeOffset(): { top: number; left: number } {
  if (!canvasRef.value) return { top: 0, left: 0 }
  const iframeEl = canvasRef.value.querySelector('iframe')
  if (!iframeEl) return { top: 0, left: 0 }
  const iframeRect = iframeEl.getBoundingClientRect()
  const canvasRect = canvasRef.value.getBoundingClientRect()
  return {
    top: iframeRect.top - canvasRect.top,
    left: iframeRect.left - canvasRect.left,
  }
}

function getNodeRect(nodeId: string): { top: number; left: number; width: number; height: number } | null {
  if (!iframeDoc.value || !canvasRef.value) return null

  const el = iframeDoc.value.querySelector(`.node-${nodeId}`)
  if (!el) return null

  const offset = getIframeOffset()
  const nodeRect = el.getBoundingClientRect()

  return {
    top: nodeRect.top + offset.top,
    left: nodeRect.left + offset.left,
    width: nodeRect.width,
    height: nodeRect.height,
  }
}

function updateSelectionRects() {
  if (editorStore.selectedId) {
    selectedRect.value = getNodeRect(editorStore.selectedId)
  } else {
    selectedRect.value = null
  }

  if (editorStore.hoveredId && editorStore.hoveredId !== editorStore.selectedId) {
    hoveredRect.value = getNodeRect(editorStore.hoveredId)
  } else {
    hoveredRect.value = null
  }
}

watch([() => editorStore.selectedId, () => editorStore.hoveredId], updateSelectionRects)
watch(compiledHtml, () => {
  // Don't update rects mid-animation — onIframeReady handles it after FLIP completes
  if (!isAnimating.value) {
    setTimeout(updateSelectionRects, 200)
  }
})

function onIframeReady(doc: Document) {
  iframeDoc.value = doc
  // Hide selection boxes before attempting FLIP
  selectedRect.value = null
  hoveredRect.value = null
  playFlipAnimation(doc, updateSelectionRects)
  // If no FLIP was pending, playFlipAnimation returns immediately without setting isAnimating
  if (!isAnimating.value) {
    setTimeout(updateSelectionRects, 100)
  }
}

function onNodeClick(nodeId: string) {
  editorStore.selectNode(nodeId)
}

function onNodeHover(nodeId: string | null) {
  editorStore.hoverNode(nodeId)
}

function onIframeClick() {
  editorStore.selectNode(null)
}

const selectedNodeType = computed(() => {
  if (!editorStore.selectedId) return null
  const node = treeUtils.findById(editorStore.tree, editorStore.selectedId)
  return node?.type || null
})

// Can the selected node be dragged? (not mj-body)
const selectedNodeDraggable = computed(() => {
  if (!editorStore.selectedId) return false
  const node = treeUtils.findById(editorStore.tree, editorStore.selectedId)
  return node ? node.type !== 'mj-body' : false
})

// --- Pointer-based drag for existing nodes ---
const isPointerDragging = ref(false)

function isDescendant(root: typeof editorStore.tree, ancestorId: string, nodeId: string): boolean {
  const ancestor = treeUtils.findById(root, ancestorId)
  if (!ancestor) return false
  return treeUtils.findById(ancestor, nodeId) !== null
}

function onSelectionDragStart(e: PointerEvent) {
  if (!editorStore.selectedId) return

  const node = treeUtils.findById(editorStore.tree, editorStore.selectedId)
  if (!node || node.type === 'mj-body') return

  cancelFlip()

  isPointerDragging.value = true
  dragStore.startDrag({ nodeId: editorStore.selectedId })
  dragStore.ghostPosition = { x: e.clientX, y: e.clientY }

  document.addEventListener('pointermove', onPointerDragMove)
  document.addEventListener('pointerup', onPointerDragEnd)
}

function onPointerDragMove(e: PointerEvent) {
  if (!isPointerDragging.value) return
  dragStore.ghostPosition = { x: e.clientX, y: e.clientY }
  resolveDropTarget(e.clientX, e.clientY)
}

function onPointerDragEnd() {
  if (!isPointerDragging.value) return

  document.removeEventListener('pointermove', onPointerDragMove)
  document.removeEventListener('pointerup', onPointerDragEnd)

  if (resolvedDropParentId.value && dragStore.dragSource?.nodeId) {
    if (iframeDoc.value) {
      captureBeforeMove(iframeDoc.value, dragStore.dragSource.nodeId)
    }
    editorStore.moveNode(
      dragStore.dragSource.nodeId,
      resolvedDropParentId.value,
      resolvedDropIndex.value,
    )
  }

  isPointerDragging.value = false
  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  dragStore.endDrag()
}

// --- Drag & drop over canvas ---

/**
 * Resolve the best drop target by looking at what the mouse is over inside the iframe.
 * We read positions of nodes from the iframe DOM and pick the closest valid parent + index.
 */
function resolveDropTarget(clientX: number, clientY: number) {
  if (!iframeDoc.value || !canvasRef.value) return

  const source = dragStore.dragSource
  if (!source) return

  // Resolve the dragged node type
  let draggedType: NodeType
  if (source.nodeType) {
    draggedType = source.nodeType as NodeType
  } else if (source.nodeId) {
    const draggedNode = treeUtils.findById(editorStore.tree, source.nodeId)
    if (!draggedNode) return
    draggedType = draggedNode.type
  } else {
    return
  }

  // Get iframe element to translate coordinates
  const iframeEl = canvasRef.value.querySelector('iframe')
  if (!iframeEl) return
  const iframeRect = iframeEl.getBoundingClientRect()

  // Mouse position relative to iframe content
  const iframeX = clientX - iframeRect.left
  const iframeY = clientY - iframeRect.top

  // Find all potential parent nodes whose type allows this child
  const allNodes = treeUtils.flatten(editorStore.tree)
  const validParents = allNodes.filter(n => {
    const allowed = ALLOWED_CHILDREN[n.type]
    if (!allowed || !allowed.includes(draggedType)) return false
    // Prevent dropping a node into itself or its descendants
    if (source.nodeId) {
      if (n.id === source.nodeId) return false
      if (isDescendant(editorStore.tree, source.nodeId, n.id)) return false
    }
    return true
  })

  if (validParents.length === 0) return

  // For each valid parent, find its element in the iframe and check if mouse is within
  let bestParent = validParents[0]
  let bestDistance = Infinity

  for (const parent of validParents) {
    const el = iframeDoc.value!.querySelector(`.node-${parent.id}`)
    if (!el) continue
    const rect = el.getBoundingClientRect()

    // Check if mouse is within this element (with some tolerance)
    const withinX = iframeX >= rect.left - 20 && iframeX <= rect.right + 20
    const withinY = iframeY >= rect.top - 20 && iframeY <= rect.bottom + 20

    if (withinX && withinY) {
      // Prefer the deepest (most specific) match — smallest area
      const area = rect.width * rect.height
      if (area < bestDistance) {
        bestDistance = area
        bestParent = parent
      }
    }
  }

  // If nothing matched geometrically, fall back to first valid parent
  resolvedDropParentId.value = bestParent.id

  // Calculate drop index among children (skip the dragged node itself)
  const children = bestParent.children.filter(c => !c.hidden && c.id !== source.nodeId)
  let dropIdx = children.length

  for (let i = 0; i < children.length; i++) {
    const childEl = iframeDoc.value!.querySelector(`.node-${children[i].id}`)
    if (!childEl) continue
    const childRect = childEl.getBoundingClientRect()
    const midY = childRect.top + childRect.height / 2
    if (iframeY < midY) {
      dropIdx = i
      break
    }
  }

  resolvedDropIndex.value = dropIdx

  // Position the drop indicator
  const offset = getIframeOffset()
  const parentEl = iframeDoc.value!.querySelector(`.node-${bestParent.id}`)
  if (parentEl) {
    const parentRect = parentEl.getBoundingClientRect()

    if (dropIdx < children.length) {
      const childEl = iframeDoc.value!.querySelector(`.node-${children[dropIdx].id}`)
      if (childEl) {
        const childRect = childEl.getBoundingClientRect()
        dropIndicatorY.value = childRect.top + offset.top - 1
        dropIndicatorX.value = childRect.left + offset.left
        dropIndicatorWidth.value = childRect.width
      }
    } else {
      // After last child, or empty parent
      if (children.length > 0) {
        const lastChild = children[children.length - 1]
        const lastEl = iframeDoc.value!.querySelector(`.node-${lastChild.id}`)
        if (lastEl) {
          const lastRect = lastEl.getBoundingClientRect()
          dropIndicatorY.value = lastRect.bottom + offset.top + 1
          dropIndicatorX.value = lastRect.left + offset.left
          dropIndicatorWidth.value = lastRect.width
        }
      } else {
        dropIndicatorY.value = parentRect.top + offset.top + 10
        dropIndicatorX.value = parentRect.left + offset.left
        dropIndicatorWidth.value = parentRect.width
      }
    }
    dropIndicatorVisible.value = true
  }
}

function handleOverlayDragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  if (!dragStore.isDragging) return

  dragStore.ghostPosition = { x: e.clientX, y: e.clientY }
  resolveDropTarget(e.clientX, e.clientY)
}

function handleOverlayDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  if (!resolvedDropParentId.value || !dragStore.dragSource) {
    dragStore.endDrag()
    return
  }

  const source = dragStore.dragSource

  if (source.nodeType) {
    const newNode = createNode(source.nodeType as NodeType)
    editorStore.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
    editorStore.selectNode(newNode.id)
  } else if (source.nodeId) {
    if (iframeDoc.value) {
      captureBeforeMove(iframeDoc.value, source.nodeId)
    }
    editorStore.moveNode(source.nodeId, resolvedDropParentId.value, resolvedDropIndex.value)
  }

  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  dragStore.endDrag()
}

function handleOverlayDragLeave() {
  dropIndicatorVisible.value = false
}

// Global dragover to keep ghost position updated even outside the canvas
function onGlobalDragOver(e: DragEvent) {
  if (dragStore.isDragging) {
    dragStore.ghostPosition = { x: e.clientX, y: e.clientY }
  }
}

function onGlobalDragEnd() {
  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  dragStore.endDrag()
}

onMounted(() => {
  document.addEventListener('dragover', onGlobalDragOver)
  document.addEventListener('dragend', onGlobalDragEnd)
})

onUnmounted(() => {
  document.removeEventListener('dragover', onGlobalDragOver)
  document.removeEventListener('dragend', onGlobalDragEnd)
})
</script>

<template>
  <div
    ref="canvasRef"
    class="relative flex-1 bg-gray-100 overflow-auto"
  >
    <!-- MJML Source view -->
    <div v-if="previewStore.mode === 'mjml-source'" class="h-full overflow-auto p-4">
      <pre class="text-xs font-mono text-gray-700 bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">{{ mjmlSource }}</pre>
    </div>

    <!-- Live preview -->
    <div
      v-else
      class="h-full flex justify-center"
    >
      <div
        class="h-full transition-all duration-300 bg-white shadow-sm"
        :style="{ width: previewStore.canvasWidth, maxWidth: '100%' }"
      >
        <CanvasIframe
          :html="compiledHtml"
          @nodeClick="onNodeClick"
          @nodeHover="onNodeHover"
          @iframeClick="onIframeClick"
          @ready="onIframeReady"
        />
      </div>
    </div>

    <!-- Transparent drag overlay — covers iframe during drag to capture events -->
    <div
      v-if="dragStore.isDragging && previewStore.mode !== 'mjml-source'"
      class="absolute inset-0 z-40"
      :class="{ 'cursor-grabbing': isPointerDragging }"
      @dragover.prevent="handleOverlayDragOver"
      @drop.prevent="handleOverlayDrop"
      @dragleave="handleOverlayDragLeave"
      @dragend="onDragEnd"
      @pointermove="onPointerDragMove"
      @pointerup="onPointerDragEnd"
    />

    <!-- Drop indicator line -->
    <DropZoneIndicator
      :visible="dropIndicatorVisible"
      :y="dropIndicatorY"
      :x="dropIndicatorX"
      :width="dropIndicatorWidth"
    />

    <!-- Selection overlays -->
    <SelectionBox
      :rect="selectedRect"
      type="selected"
      :draggable="selectedNodeDraggable"
      @dragStart="onSelectionDragStart"
    >
      <template #label>{{ selectedNodeType?.replace('mj-', '') }}</template>
    </SelectionBox>
    <SelectionBox :rect="hoveredRect" type="hovered" />

    <!-- Drag ghost -->
    <DragGhost />
  </div>
</template>
