<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useEditor } from '@/composables/useEditor'
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

const editor = useEditor()
const { saveNode, savedSections, cloneNode: cloneSavedSection } = useSavedSections()
const { onDragEnd } = useDragDrop()
const { captureBeforeMove, playFlipAnimation, cancelFlip, isAnimating } = useFlipAnimation()

const iframeDoc = ref<Document | null>(null)
const canvasRef = ref<HTMLElement>()
const toolbarActive = ref(false)

const selectedRect = ref<{ top: number; left: number; width: number; height: number } | null>(null)
const hoveredRects = ref<{ top: number; left: number; width: number; height: number }[]>([])

const dropIndicatorVisible = ref(false)
const dropIndicatorY = ref(0)
const dropIndicatorX = ref(0)
const dropIndicatorWidth = ref(0)

const resolvedDropParentId = ref<string | null>(null)
const resolvedDropIndex = ref(0)
const resolvedAutoWrap = ref(false)


const dropParentRect = computed(() => {
  if (!resolvedDropParentId.value || !editor.drag.isDragging) return null
  return getNodeRect(resolvedDropParentId.value)
})

function getIframeOffset(): { top: number; left: number } {
  if (!canvasRef.value) return { top: 0, left: 0 }
  const iframeEl = canvasRef.value.querySelector('iframe')
  if (!iframeEl) return { top: 0, left: 0 }
  const iframeRect = iframeEl.getBoundingClientRect()
  const canvasRect = canvasRef.value.getBoundingClientRect()
  return { top: iframeRect.top - canvasRect.top, left: iframeRect.left - canvasRect.left }
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
  selectedRect.value = editor.selectedId ? getNodeRect(editor.selectedId) : null

  if (editor.hoveredId && editor.hoveredId !== editor.selectedId) {
    const ids = [editor.hoveredId, ...treeUtils.getAncestorIds(editor.tree, editor.hoveredId)]
    hoveredRects.value = ids
      .filter(id => id !== editor.selectedId && id !== editor.tree.id)
      .map(id => getNodeRect(id))
      .filter((r): r is NonNullable<typeof r> => r !== null)
  } else {
    hoveredRects.value = []
  }
}

watch([() => editor.selectedId, () => editor.hoveredId], updateSelectionRects)
watch(() => editor.preview.mode, (mode) => {
  if (mode === 'mjml-source' || mode === 'html-source') {
    selectedRect.value = null
    hoveredRects.value = []
  } else {
    setTimeout(updateSelectionRects, 300)
  }
})
watch(() => editor.compiledHtml, () => {
  if (!isAnimating.value) setTimeout(updateSelectionRects, 200)
})

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
  selectedRect.value = null
  hoveredRects.value = []
  playFlipAnimation(doc, () => updateSelectionRects())
  if (!isAnimating.value) setTimeout(updateSelectionRects, 100)
}

function onNodeClick(nodeId: string) { editor.select(nodeId) }
function onNodeHover(nodeId: string | null) { editor.hover(nodeId) }
function onIframeClick() { editor.select(null) }

const selectedNodeType = computed(() => {
  if (!editor.selectedId) return null
  return treeUtils.findById(editor.tree, editor.selectedId)?.type ?? null
})

const nodeTypeMap = computed(() => {
  const map: Record<string, string> = {}
  for (const node of treeUtils.flatten(editor.tree)) map[node.id] = node.type
  return map
})

function onEditStart(nodeId: string) {
  editor.select(nodeId)
  editor.startEditing(nodeId)
  editor.pauseCompiler()
}

function onEditEnd(nodeId: string, content: string) {
  editor.updateContent(nodeId, content)
  editor.stopEditing()
  editor.resumeCompiler()
}

const selectedNodeDraggable = computed(() => {
  if (!editor.selectedId) return false
  const node = treeUtils.findById(editor.tree, editor.selectedId)
  return node ? node.type !== 'mj-body' : false
})

const selectedNodeParentInfo = computed(() => {
  if (!editor.selectedId) return null
  const parent = treeUtils.findParent(editor.tree, editor.selectedId)
  if (!parent) return null
  const index = parent.children.findIndex(c => c.id === editor.selectedId)
  if (index === -1) return null
  return { parent, index, total: parent.children.length }
})

const canMoveUp = computed(() => (selectedNodeParentInfo.value?.index ?? 0) > 0)
const canMoveDown = computed(() => {
  const info = selectedNodeParentInfo.value
  return info ? info.index < info.total - 1 : false
})

function onMoveUp() {
  const info = selectedNodeParentInfo.value
  if (!info || !editor.selectedId) return
  if (iframeDoc.value) captureBeforeMove(iframeDoc.value, editor.selectedId)
  editor.moveNode(editor.selectedId, info.parent.id, info.index - 1)
}

function onMoveDown() {
  const info = selectedNodeParentInfo.value
  if (!info || !editor.selectedId) return
  if (iframeDoc.value) captureBeforeMove(iframeDoc.value, editor.selectedId)
  editor.moveNode(editor.selectedId, info.parent.id, info.index + 1)
}

function onDuplicateSelected() {
  if (editor.selectedId) editor.duplicateNode(editor.selectedId)
}

function onDeleteSelected() {
  if (editor.selectedId) editor.removeNode(editor.selectedId)
}

function onSaveSection() {
  if (!editor.selectedId) return
  const node = treeUtils.findById(editor.tree, editor.selectedId)
  if (!node) return
  const label = node.type.replace('mj-', '')
  const name = prompt('Name this section:', label) ?? label
  saveNode(node, name.trim() || label)
}

// ── Pointer-based drag for existing nodes ────────────────────────────────────

const isPointerDragging = ref(false)

function isDescendant(ancestorId: string, nodeId: string): boolean {
  const ancestor = treeUtils.findById(editor.tree, ancestorId)
  if (!ancestor) return false
  return treeUtils.findById(ancestor, nodeId) !== null
}

function onSelectionDragStart(e: PointerEvent) {
  if (!editor.selectedId) return
  const node = treeUtils.findById(editor.tree, editor.selectedId)
  if (!node || node.type === 'mj-body') return
  cancelFlip()
  isPointerDragging.value = true
  editor.drag.startDrag({ nodeId: editor.selectedId })
  editor.drag.ghostPosition = { x: e.clientX, y: e.clientY }
  document.addEventListener('pointermove', onPointerDragMove)
  document.addEventListener('pointerup', onPointerDragEnd)
}

function onPointerDragMove(e: PointerEvent) {
  if (!isPointerDragging.value) return
  editor.drag.ghostPosition = { x: e.clientX, y: e.clientY }
  resolveDropTarget(e.clientX, e.clientY)
}

function onPointerDragEnd() {
  if (!isPointerDragging.value) return
  document.removeEventListener('pointermove', onPointerDragMove)
  document.removeEventListener('pointerup', onPointerDragEnd)

  if (resolvedDropParentId.value && editor.drag.dragSource) {
    const src = editor.drag.dragSource
    if (src.nodeId) {
      if (iframeDoc.value) captureBeforeMove(iframeDoc.value, src.nodeId)
      editor.moveNode(src.nodeId, resolvedDropParentId.value, resolvedDropIndex.value)
    } else if (src.savedSectionId) {
      const saved = savedSections.value.find(s => s.id === src.savedSectionId)
      if (saved) {
        const newNode = cloneSavedSection(saved)
        editor.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
        editor.select(newNode.id)
      }
    }
  }

  isPointerDragging.value = false
  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  editor.drag.endDrag()
}

// ── Drop target resolution ────────────────────────────────────────────────────

function resolveDropTarget(clientX: number, clientY: number) {
  if (!iframeDoc.value || !canvasRef.value) return
  const source = editor.drag.dragSource
  if (!source) return

  let draggedType: NodeType
  if (source.nodeType) {
    draggedType = source.nodeType as NodeType
  } else if (source.nodeId) {
    const draggedNode = treeUtils.findById(editor.tree, source.nodeId)
    if (!draggedNode) return
    draggedType = draggedNode.type
  } else if (source.savedSectionId) {
    const saved = savedSections.value.find(s => s.id === source.savedSectionId)
    if (!saved) return
    draggedType = saved.nodeType as NodeType
  } else {
    return
  }

  const iframeEl = canvasRef.value.querySelector('iframe')
  if (!iframeEl) return
  const iframeRect = iframeEl.getBoundingClientRect()
  const iframeX = clientX - iframeRect.left
  const iframeY = clientY - iframeRect.top

  const allNodes = treeUtils.flatten(editor.tree)
  const validParents = allNodes.filter(n => {
    const allowed = ALLOWED_CHILDREN[n.type]
    if (!allowed?.includes(draggedType)) return false
    if (source.nodeId) {
      if (n.id === source.nodeId) return false
      if (isDescendant(source.nodeId, n.id)) return false
    }
    return true
  })

  if (validParents.length === 0) return

  resolvedAutoWrap.value = false

  let bestParent: typeof validParents[0] | null = null
  let bestDistance = Infinity

  for (const parent of validParents) {
    const el = parent.type === 'mj-body'
      ? iframeDoc.value!.body
      : iframeDoc.value!.querySelector(`.node-${parent.id}`)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    const withinX = iframeX >= rect.left - 20 && iframeX <= rect.right + 20
    const withinY = iframeY >= rect.top - 20 && iframeY <= rect.bottom + 20
    if (withinX && withinY) {
      const area = rect.width * rect.height
      if (area < bestDistance) { bestDistance = area; bestParent = parent }
    }
  }

  if (!bestParent && source.nodeType) {
    const columnChildren = ALLOWED_CHILDREN['mj-column']
    const sectionChildren = ALLOWED_CHILDREN['mj-section']
    const canAutoWrap = columnChildren.includes(draggedType) || sectionChildren.includes(draggedType)

    if (canAutoWrap) {
      resolvedDropParentId.value = editor.tree.id
      resolvedAutoWrap.value = true

      const bodyChildren = editor.tree.children.filter(c => !c.hidden && c.id !== source.nodeId)
      let dropIdx = bodyChildren.length

      for (let i = 0; i < bodyChildren.length; i++) {
        const childEl = iframeDoc.value!.querySelector(`.node-${bodyChildren[i].id}`)
        if (!childEl) continue
        const childRect = childEl.getBoundingClientRect()
        if (iframeY < childRect.top + childRect.height / 2) { dropIdx = i; break }
      }

      resolvedDropIndex.value = dropIdx
      const offset = getIframeOffset()

      if (dropIdx < bodyChildren.length) {
        const childEl = iframeDoc.value!.querySelector(`.node-${bodyChildren[dropIdx].id}`)
        if (childEl) {
          const r = childEl.getBoundingClientRect()
          dropIndicatorY.value = r.top + offset.top - 1
          dropIndicatorX.value = r.left + offset.left
          dropIndicatorWidth.value = r.width
        }
      } else if (bodyChildren.length > 0) {
        const lastEl = iframeDoc.value!.querySelector(`.node-${bodyChildren[bodyChildren.length - 1].id}`)
        if (lastEl) {
          const r = lastEl.getBoundingClientRect()
          dropIndicatorY.value = r.bottom + offset.top + 1
          dropIndicatorX.value = r.left + offset.left
          dropIndicatorWidth.value = r.width
        }
      }
      dropIndicatorVisible.value = true
      return
    }

    bestParent = validParents[0]
  }

  if (!bestParent) bestParent = validParents[0]
  resolvedDropParentId.value = bestParent.id

  const children = bestParent.children.filter(c => !c.hidden && c.id !== source.nodeId)
  let dropIdx = children.length

  for (let i = 0; i < children.length; i++) {
    const childEl = iframeDoc.value!.querySelector(`.node-${children[i].id}`)
    if (!childEl) continue
    const childRect = childEl.getBoundingClientRect()
    if (iframeY < childRect.top + childRect.height / 2) { dropIdx = i; break }
  }

  resolvedDropIndex.value = dropIdx

  const offset = getIframeOffset()
  const parentEl = bestParent.type === 'mj-body'
    ? iframeDoc.value!.body
    : iframeDoc.value!.querySelector(`.node-${bestParent.id}`)

  if (parentEl) {
    const parentRect = parentEl.getBoundingClientRect()
    if (dropIdx < children.length) {
      const childEl = iframeDoc.value!.querySelector(`.node-${children[dropIdx].id}`)
      if (childEl) {
        const r = childEl.getBoundingClientRect()
        dropIndicatorY.value = r.top + offset.top - 1
        dropIndicatorX.value = r.left + offset.left
        dropIndicatorWidth.value = r.width
      }
    } else if (children.length > 0) {
      const lastEl = iframeDoc.value!.querySelector(`.node-${children[children.length - 1].id}`)
      if (lastEl) {
        const r = lastEl.getBoundingClientRect()
        dropIndicatorY.value = r.bottom + offset.top + 1
        dropIndicatorX.value = r.left + offset.left
        dropIndicatorWidth.value = r.width
      }
    } else {
      dropIndicatorY.value = parentRect.top + offset.top + 10
      dropIndicatorX.value = parentRect.left + offset.left
      dropIndicatorWidth.value = parentRect.width
    }
    dropIndicatorVisible.value = true
  }
}

function handleOverlayDragOver(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()
  if (!editor.drag.isDragging) return
  editor.drag.ghostPosition = { x: e.clientX, y: e.clientY }
  resolveDropTarget(e.clientX, e.clientY)
}

function autoWrapAndInsert(nodeType: NodeType, index: number): string | null {
  const columnChildren = ALLOWED_CHILDREN['mj-column']
  const sectionChildren = ALLOWED_CHILDREN['mj-section']
  const bodyChildren = ALLOWED_CHILDREN['mj-body']

  if (columnChildren.includes(nodeType)) {
    const contentNode = createNode(nodeType)
    const column = createNode('mj-column', { children: [contentNode] })
    const section = createNode('mj-section', { children: [column] })
    editor.insertNode(section, editor.tree.id, index)
    return contentNode.id
  }
  if (sectionChildren.includes(nodeType)) {
    const column = createNode(nodeType)
    const section = createNode('mj-section', { children: [column] })
    editor.insertNode(section, editor.tree.id, index)
    return column.id
  }
  if (bodyChildren.includes(nodeType)) {
    const node = createNode(nodeType)
    editor.insertNode(node, editor.tree.id, index)
    return node.id
  }
  return null
}

function handleOverlayDrop(e: DragEvent) {
  e.preventDefault()
  e.stopPropagation()

  const source = editor.drag.dragSource
  if (!source) { editor.drag.endDrag(); return }

  if (resolvedAutoWrap.value && source.nodeType) {
    const insertedId = autoWrapAndInsert(source.nodeType as NodeType, resolvedDropIndex.value)
    if (insertedId) editor.select(insertedId)
  } else if (resolvedDropParentId.value) {
    if (source.nodeType) {
      const newNode = createNode(source.nodeType as NodeType)
      editor.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
      editor.select(newNode.id)
    } else if (source.nodeId) {
      if (iframeDoc.value) captureBeforeMove(iframeDoc.value, source.nodeId)
      editor.moveNode(source.nodeId, resolvedDropParentId.value, resolvedDropIndex.value)
    } else if (source.savedSectionId) {
      const saved = savedSections.value.find(s => s.id === source.savedSectionId)
      if (saved) {
        const newNode = cloneSavedSection(saved)
        editor.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
        editor.select(newNode.id)
      }
    }
  } else if (source.nodeType) {
    const insertedId = autoWrapAndInsert(source.nodeType as NodeType, editor.tree.children.length)
    if (insertedId) editor.select(insertedId)
  } else if (source.savedSectionId) {
    const saved = savedSections.value.find(s => s.id === source.savedSectionId)
    if (saved) {
      const newNode = cloneSavedSection(saved)
      editor.insertNode(newNode, editor.tree.id, editor.tree.children.length)
      editor.select(newNode.id)
    }
  }

  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  resolvedAutoWrap.value = false
  editor.drag.endDrag()
}

function handleOverlayDragLeave() { dropIndicatorVisible.value = false }

function onGlobalDragOver(e: DragEvent) {
  if (editor.drag.isDragging) editor.drag.ghostPosition = { x: e.clientX, y: e.clientY }
}

function onGlobalDragEnd() {
  dropIndicatorVisible.value = false
  resolvedDropParentId.value = null
  editor.drag.endDrag()
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
    @click.self="editor.select(null)"
  >
    <!-- MJML Source view -->
    <div v-if="editor.preview.mode === 'mjml-source'" class="h-full overflow-auto p-4">
      <pre class="text-xs font-mono text-gray-700 bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">{{ editor.mjmlSource }}</pre>
    </div>

    <!-- HTML Source view -->
    <HtmlSourcePanel v-else-if="editor.preview.mode === 'html-source'" :html="editor.compiledHtml" />

    <!-- Live preview -->
    <div
      v-else
      class="h-full flex justify-center"
      @click.self="editor.select(null)"
    >
      <div
        class="h-full transition-all duration-300 bg-white shadow-sm"
        :style="{ width: editor.preview.canvasWidth, maxWidth: '100%' }"
      >
        <CanvasIframe
          :html="editor.compiledHtml"
          :editingNodeId="editor.editingNodeId"
          :nodeTypes="nodeTypeMap"
          :toolbarActive="toolbarActive"
          :showGridLines="editor.preview.showGridLines"
          @nodeClick="onNodeClick"
          @nodeHover="onNodeHover"
          @iframeClick="onIframeClick"
          @ready="onIframeReady"
          @editStart="onEditStart"
          @editEnd="onEditEnd"
        />
      </div>
    </div>

    <!-- Transparent drag overlay -->
    <div
      v-if="editor.drag.isDragging && editor.preview.mode !== 'mjml-source' && editor.preview.mode !== 'html-source'"
      class="absolute inset-0 z-40"
      :class="{ 'cursor-grabbing': isPointerDragging }"
      @dragover.prevent="handleOverlayDragOver"
      @drop.prevent="handleOverlayDrop"
      @dragleave="handleOverlayDragLeave"
      @dragend="onDragEnd"
      @pointermove="onPointerDragMove"
      @pointerup="onPointerDragEnd"
    />

    <!-- Overlay container -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <DropZoneIndicator
        :visible="dropIndicatorVisible"
        :y="dropIndicatorY"
        :x="dropIndicatorX"
        :width="dropIndicatorWidth"
      />

      <SelectionBox
        v-if="!editor.editingNodeId && editor.preview.mode !== 'mjml-source' && editor.preview.mode !== 'html-source'"
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
        v-show="!editor.editingNodeId && editor.preview.mode !== 'mjml-source' && editor.preview.mode !== 'html-source'"
        :key="i"
        :rect="rect"
        type="hovered"
      />

      <SelectionBox
        v-if="editor.drag.isDragging"
        :rect="dropParentRect"
        type="drop-target"
      />

      <DragGhost />
    </div>

    <!-- Inline edit toolbar -->
    <InlineEditToolbar
      :iframeDoc="iframeDoc"
      :editingNodeId="editor.editingNodeId"
      @update:active="toolbarActive = $event"
    />
  </div>
</template>
