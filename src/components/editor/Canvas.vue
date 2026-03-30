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
import { useSavedSections } from '@/composables/useSavedSections'
import CanvasIframe from '@/components/canvas/CanvasIframe.vue'
import HtmlSourcePanel from '@/components/canvas/HtmlSourcePanel.vue'
import SelectionBox from '@/components/canvas/SelectionBox.vue'
import DropZoneIndicator from '@/components/canvas/DropZoneIndicator.vue'
import DragGhost from '@/components/canvas/DragGhost.vue'
import InlineEditToolbar from '@/components/canvas/InlineEditToolbar.vue'


const editorStore = useEditorStore()
const previewStore = usePreviewStore()
const dragStore = useDragStore()
const { saveNode, savedSections, cloneNode: cloneSavedSection } = useSavedSections()
const { compiledHtml, mjmlSource, pause: pauseCompiler, resume: resumeCompiler } = useMjmlCompiler()
const { onDragEnd } = useDragDrop()
const { captureBeforeMove, playFlipAnimation, cancelFlip, isAnimating } = useFlipAnimation()

const iframeDoc = ref<Document | null>(null)
const canvasRef = ref<HTMLElement>()
const toolbarActive = ref(false)

const selectedRect = ref<{ top: number; left: number; width: number; height: number } | null>(null)
const hoveredRects = ref<{ top: number; left: number; width: number; height: number }[]>([])

// Drop indicator state
const dropIndicatorVisible = ref(false)
const dropIndicatorY = ref(0)
const dropIndicatorX = ref(0)
const dropIndicatorWidth = ref(0)

// Resolved drop target
const resolvedDropParentId = ref<string | null>(null)
const resolvedDropIndex = ref(0)
const resolvedAutoWrap = ref(false) // true when dropping onto body needs auto-wrap

const bodyWidth = computed(() => editorStore.tree.props['width'] || '600px')

// Drop target container highlight
const dropParentRect = computed(() => {
  if (!resolvedDropParentId.value || !dragStore.isDragging) return null
  return getNodeRect(resolvedDropParentId.value)
})

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
    const ids = [editorStore.hoveredId, ...treeUtils.getAncestorIds(editorStore.tree, editorStore.hoveredId)]
    hoveredRects.value = ids
      .filter(id => id !== editorStore.selectedId && id !== editorStore.tree.id)
      .map(id => getNodeRect(id))
      .filter((r): r is NonNullable<typeof r> => r !== null)
  } else {
    hoveredRects.value = []
  }
}

watch([() => editorStore.selectedId, () => editorStore.hoveredId], updateSelectionRects)
watch(() => previewStore.mode, (mode) => {
  if (mode === 'mjml-source' || mode === 'html-source') {
    selectedRect.value = null
    hoveredRects.value = []
  } else {
    setTimeout(updateSelectionRects, 300)
  }
})
watch(compiledHtml, () => {
  // Don't update rects mid-animation — onIframeReady handles it after FLIP completes
  if (!isAnimating.value) {
    setTimeout(updateSelectionRects, 200)
  }
})

// Listen for scroll inside the iframe to update selection rects in real-time
let iframeScrollCleanup: (() => void) | null = null

function attachIframeScrollListener(doc: Document) {
  iframeScrollCleanup?.()
  const win = doc.defaultView
  if (!win) return
  const onScroll = () => updateSelectionRects()
  win.addEventListener('scroll', onScroll, { passive: true })
  iframeScrollCleanup = () => win.removeEventListener('scroll', onScroll)
}

function onIframeReady(doc: Document) {
  iframeDoc.value = doc
  attachIframeScrollListener(doc)
  // Hide selection boxes before attempting FLIP
  selectedRect.value = null
  hoveredRects.value = []
  playFlipAnimation(doc, () => {
    updateSelectionRects()
  })
  // If no FLIP was pending, playFlipAnimation returns immediately without setting isAnimating
  if (!isAnimating.value) {
    setTimeout(updateSelectionRects, 100)
  }
}

function onNodeClick(nodeId: string) {
  // If editing a different node, the blur on the contenteditable will handle stopping
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

// Build a nodeId -> nodeType map for the iframe to check inline-editable types
const nodeTypeMap = computed(() => {
  const map: Record<string, string> = {}
  for (const node of treeUtils.flatten(editorStore.tree)) {
    map[node.id] = node.type
  }
  return map
})

function onEditStart(nodeId: string) {
  editorStore.selectNode(nodeId)
  editorStore.startEditing(nodeId)
  pauseCompiler()
}

function onEditEnd(nodeId: string, content: string) {
  editorStore.updateNodeContent(nodeId, content)
  editorStore.stopEditing()
  resumeCompiler()
}

// Can the selected node be dragged? (not mj-body)
const selectedNodeDraggable = computed(() => {
  if (!editorStore.selectedId) return false
  const node = treeUtils.findById(editorStore.tree, editorStore.selectedId)
  return node ? node.type !== 'mj-body' : false
})

// Selected node's index in parent for move up/down
const selectedNodeParentInfo = computed(() => {
  if (!editorStore.selectedId) return null
  const parent = treeUtils.findParent(editorStore.tree, editorStore.selectedId)
  if (!parent) return null
  const index = parent.children.findIndex(c => c.id === editorStore.selectedId)
  if (index === -1) return null
  return { parent, index, total: parent.children.length }
})

const canMoveUp = computed(() => {
  const info = selectedNodeParentInfo.value
  return info ? info.index > 0 : false
})

const canMoveDown = computed(() => {
  const info = selectedNodeParentInfo.value
  return info ? info.index < info.total - 1 : false
})

function onMoveUp() {
  const info = selectedNodeParentInfo.value
  if (!info || !editorStore.selectedId) return
  if (iframeDoc.value) {
    captureBeforeMove(iframeDoc.value, editorStore.selectedId)
  }
  editorStore.moveNode(editorStore.selectedId, info.parent.id, info.index - 1)
}

function onMoveDown() {
  const info = selectedNodeParentInfo.value
  if (!info || !editorStore.selectedId) return
  if (iframeDoc.value) {
    captureBeforeMove(iframeDoc.value, editorStore.selectedId)
  }
  editorStore.moveNode(editorStore.selectedId, info.parent.id, info.index + 1)
}

function onDuplicateSelected() {
  if (!editorStore.selectedId) return
  editorStore.duplicateNode(editorStore.selectedId)
}

function onDeleteSelected() {
  if (!editorStore.selectedId) return
  editorStore.removeNode(editorStore.selectedId)
}

function onSaveSection() {
  if (!editorStore.selectedId) return
  const node = treeUtils.findById(editorStore.tree, editorStore.selectedId)
  if (!node) return
  const label = node.type.replace('mj-', '')
  const name = prompt('Name this section:', label) ?? label
  saveNode(node, name.trim() || label)
}

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

  if (resolvedDropParentId.value && dragStore.dragSource) {
    const src = dragStore.dragSource
    if (src.nodeId) {
      if (iframeDoc.value) {
        captureBeforeMove(iframeDoc.value, src.nodeId)
      }
      editorStore.moveNode(src.nodeId, resolvedDropParentId.value, resolvedDropIndex.value)
    } else if (src.savedSectionId) {
      const saved = savedSections.value.find(s => s.id === src.savedSectionId)
      if (saved) {
        const newNode = cloneSavedSection(saved)
        editorStore.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
        editorStore.selectNode(newNode.id)
      }
    }
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
  } else if (source.savedSectionId) {
    const saved = savedSections.value.find(s => s.id === source.savedSectionId)
    if (!saved) return
    draggedType = saved.nodeType as NodeType
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

  resolvedAutoWrap.value = false

  // For each valid parent, find its element in the iframe and check if mouse is within
  let bestParent: typeof validParents[0] | null = null
  let bestDistance = Infinity

  for (const parent of validParents) {
    const el = parent.type === 'mj-body'
      ? iframeDoc.value!.body
      : iframeDoc.value!.querySelector(`.node-${parent.id}`)
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

  // Mouse is not inside any valid parent — try auto-wrap at body level
  if (!bestParent && source.nodeType) {
    const columnChildren = ALLOWED_CHILDREN['mj-column']
    const sectionChildren = ALLOWED_CHILDREN['mj-section']
    const canAutoWrap = columnChildren.includes(draggedType) || sectionChildren.includes(draggedType)

    if (canAutoWrap) {
      resolvedDropParentId.value = editorStore.tree.id
      resolvedAutoWrap.value = true

      const bodyChildren = editorStore.tree.children.filter(c => !c.hidden && c.id !== source.nodeId)
      let dropIdx = bodyChildren.length

      for (let i = 0; i < bodyChildren.length; i++) {
        const childEl = iframeDoc.value!.querySelector(`.node-${bodyChildren[i].id}`)
        if (!childEl) continue
        const childRect = childEl.getBoundingClientRect()
        const midY = childRect.top + childRect.height / 2
        if (iframeY < midY) {
          dropIdx = i
          break
        }
      }

      resolvedDropIndex.value = dropIdx

      const offset = getIframeOffset()
      if (dropIdx < bodyChildren.length) {
        const childEl = iframeDoc.value!.querySelector(`.node-${bodyChildren[dropIdx].id}`)
        if (childEl) {
          const childRect = childEl.getBoundingClientRect()
          dropIndicatorY.value = childRect.top + offset.top - 1
          dropIndicatorX.value = childRect.left + offset.left
          dropIndicatorWidth.value = childRect.width
        }
      } else if (bodyChildren.length > 0) {
        const lastChild = bodyChildren[bodyChildren.length - 1]
        const lastEl = iframeDoc.value!.querySelector(`.node-${lastChild.id}`)
        if (lastEl) {
          const lastRect = lastEl.getBoundingClientRect()
          dropIndicatorY.value = lastRect.bottom + offset.top + 1
          dropIndicatorX.value = lastRect.left + offset.left
          dropIndicatorWidth.value = lastRect.width
        }
      }
      dropIndicatorVisible.value = true
      return
    }

    // No auto-wrap possible, fall back to first valid parent
    bestParent = validParents[0]
  }

  if (!bestParent) bestParent = validParents[0]
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
  const parentEl = bestParent.type === 'mj-body'
    ? iframeDoc.value!.body
    : iframeDoc.value!.querySelector(`.node-${bestParent.id}`)
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

/**
 * Auto-wrap a component in the required parent structure.
 * E.g. dropping mj-text onto body creates: section > column > text
 */
function autoWrapAndInsert(nodeType: NodeType, index: number): string | null {
  const columnChildren = ALLOWED_CHILDREN['mj-column']
  const sectionChildren = ALLOWED_CHILDREN['mj-section']
  const bodyChildren = ALLOWED_CHILDREN['mj-body']

  // Component that belongs in a column (text, button, image, etc.)
  if (columnChildren.includes(nodeType)) {
    const contentNode = createNode(nodeType)
    const column = createNode('mj-column', { children: [contentNode] })
    const section = createNode('mj-section', { children: [column] })
    editorStore.insertNode(section, editorStore.tree.id, index)
    return contentNode.id
  }

  // Column being dropped onto body — wrap in section
  if (sectionChildren.includes(nodeType)) {
    const column = createNode(nodeType)
    const section = createNode('mj-section', { children: [column] })
    editorStore.insertNode(section, editorStore.tree.id, index)
    return column.id
  }

  // Section-level component dropped onto body — insert directly
  if (bodyChildren.includes(nodeType)) {
    const node = createNode(nodeType)
    editorStore.insertNode(node, editorStore.tree.id, index)
    return node.id
  }

  return null
}

function handleOverlayDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  const source = dragStore.dragSource
  if (!source) {
    dragStore.endDrag()
    return
  }

  if (resolvedAutoWrap.value && source.nodeType) {
    // Auto-wrap: drop onto body with section > column wrapper
    const insertedId = autoWrapAndInsert(source.nodeType as NodeType, resolvedDropIndex.value)
    if (insertedId) {
      editorStore.selectNode(insertedId)
    }
  } else if (resolvedDropParentId.value) {
    // Normal drop — valid parent found
    if (source.nodeType) {
      const newNode = createNode(source.nodeType as NodeType)
      editorStore.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
      editorStore.selectNode(newNode.id)
    } else if (source.nodeId) {
      if (iframeDoc.value) {
        captureBeforeMove(iframeDoc.value, source.nodeId)
      }
      editorStore.moveNode(source.nodeId, resolvedDropParentId.value, resolvedDropIndex.value)
    } else if (source.savedSectionId) {
      const saved = savedSections.value.find(s => s.id === source.savedSectionId)
      if (saved) {
        const newNode = cloneSavedSection(saved)
        editorStore.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
        editorStore.selectNode(newNode.id)
      }
    }
  } else if (source.nodeType) {
    // Fallback: no resolved target at all — auto-wrap at end
    const insertedId = autoWrapAndInsert(source.nodeType as NodeType, editorStore.tree.children.length)
    if (insertedId) {
      editorStore.selectNode(insertedId)
    }
  } else if (source.savedSectionId) {
    const saved = savedSections.value.find(s => s.id === source.savedSectionId)
    if (saved) {
      const newNode = cloneSavedSection(saved)
      editorStore.insertNode(newNode, editorStore.tree.id, editorStore.tree.children.length)
      editorStore.selectNode(newNode.id)
    }
  }

  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  resolvedAutoWrap.value = false
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
  iframeScrollCleanup?.()
})
</script>

<template>
  <div
    ref="canvasRef"
    class="relative flex-1 bg-gray-100 overflow-auto"
    @click.self="editorStore.selectNode(null)"
  >
    <!-- MJML Source view -->
    <div v-if="previewStore.mode === 'mjml-source'" class="h-full overflow-auto p-4">
      <pre class="text-xs font-mono text-gray-700 bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">{{ mjmlSource }}</pre>
    </div>

    <!-- HTML Source view -->
    <HtmlSourcePanel v-else-if="previewStore.mode === 'html-source'" :html="compiledHtml" />

    <!-- Live preview -->
    <div
      v-else
      class="h-full flex justify-center"
      @click.self="editorStore.selectNode(null)"
    >
      <div
        class="h-full transition-all duration-300 bg-white shadow-sm"
        :style="{ width: previewStore.canvasWidth, maxWidth: '100%' }"
      >
          <CanvasIframe
            :html="compiledHtml"
            :editingNodeId="editorStore.editingNodeId"
            :nodeTypes="nodeTypeMap"
            :toolbarActive="toolbarActive"
            :showGridLines="previewStore.showGridLines"
            @nodeClick="onNodeClick"
            @nodeHover="onNodeHover"
            @iframeClick="onIframeClick"
            @ready="onIframeReady"
            @editStart="onEditStart"
            @editEnd="onEditEnd"
          />
      </div>
    </div>

    <!-- Transparent drag overlay — covers iframe during drag to capture events -->
    <div
      v-if="dragStore.isDragging && previewStore.mode !== 'mjml-source' && previewStore.mode !== 'html-source'"
      class="absolute inset-0 z-40"
      :class="{ 'cursor-grabbing': isPointerDragging }"
      @dragover.prevent="handleOverlayDragOver"
      @drop.prevent="handleOverlayDrop"
      @dragleave="handleOverlayDragLeave"
      @dragend="onDragEnd"
      @pointermove="onPointerDragMove"
      @pointerup="onPointerDragEnd"
    />

    <!-- Overlay container — clipped to canvas bounds so overlays don't create extra scrollbars -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Drop indicator line -->
      <DropZoneIndicator
        :visible="dropIndicatorVisible"
        :y="dropIndicatorY"
        :x="dropIndicatorX"
        :width="dropIndicatorWidth"
      />

      <!-- Selection overlays (hide during inline editing or source view) -->
      <SelectionBox
        v-if="!editorStore.editingNodeId && previewStore.mode !== 'mjml-source' && previewStore.mode !== 'html-source'"
        :rect="selectedRect"
        type="selected"
        :draggable="selectedNodeDraggable"
        :canMoveUp="canMoveUp"
        :canMoveDown="canMoveDown"
        @dragStart="onSelectionDragStart"
        @moveUp="onMoveUp"
        @moveDown="onMoveDown"
        @duplicate="onDuplicateSelected"
        @delete="onDeleteSelected"
        @saveSection="onSaveSection"
      >
        <template #label>{{ selectedNodeType?.replace('mj-', '') }}</template>
      </SelectionBox>
      <SelectionBox
        v-for="(rect, i) in hoveredRects"
        v-show="!editorStore.editingNodeId && previewStore.mode !== 'mjml-source' && previewStore.mode !== 'html-source'"
        :key="i"
        :rect="rect"
        type="hovered"
      />

      <!-- Drop target container highlight -->
      <SelectionBox
        v-if="dragStore.isDragging"
        :rect="dropParentRect"
        type="drop-target"
      />

      <!-- Drag ghost -->
      <DragGhost />
    </div>

    <!-- Inline edit formatting toolbar — outside overflow-hidden wrapper so it's not clipped -->
    <InlineEditToolbar
      :iframeDoc="iframeDoc"
      :editingNodeId="editorStore.editingNodeId"
      @update:active="toolbarActive = $event"
    />
  </div>
</template>
