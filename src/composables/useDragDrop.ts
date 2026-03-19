import { useDragStore } from '@/stores/drag.store'
import { useEditorStore } from '@/stores/editor.store'
import { createNode } from '@/utils/defaultProps'
import type { DragSource } from '@/types/drag.types'
import type { NodeType } from '@/types/node.types'

export function useDragDrop() {
  const dragStore = useDragStore()
  const editorStore = useEditorStore()

  function onDragStart(e: DragEvent, source: DragSource) {
    dragStore.startDrag(source)
    // Set transparent drag image — we use our custom ghost
    const ghost = document.createElement('div')
    ghost.style.opacity = '0'
    ghost.style.position = 'fixed'
    ghost.style.top = '-1000px'
    document.body.appendChild(ghost)
    e.dataTransfer?.setDragImage(ghost, 0, 0)
    e.dataTransfer!.effectAllowed = 'move'
    setTimeout(() => document.body.removeChild(ghost), 0)
  }

  function onDragOver(e: DragEvent, parentId: string, childElements?: HTMLElement[]) {
    e.preventDefault()
    e.stopPropagation()
    dragStore.ghostPosition = { x: e.clientX, y: e.clientY }
    dragStore.dropParentId = parentId
    dragStore.dragOverNodeId = parentId

    if (childElements && childElements.length > 0) {
      dragStore.dropIndex = calculateDropIndex(e, childElements)
    } else {
      dragStore.dropIndex = 0
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const { dragSource, dropParentId, dropIndex } = dragStore

    if (!dropParentId || !dragSource) return

    if (dragSource.nodeType) {
      const newNode = createNode(dragSource.nodeType as NodeType)
      editorStore.insertNode(newNode, dropParentId, dropIndex)
      editorStore.selectNode(newNode.id)
    } else if (dragSource.nodeId) {
      editorStore.moveNode(dragSource.nodeId, dropParentId, dropIndex)
    }

    dragStore.endDrag()
  }

  function onDragEnd() {
    dragStore.endDrag()
  }

  return { onDragStart, onDragOver, onDrop, onDragEnd }
}

function calculateDropIndex(e: DragEvent, childElements: HTMLElement[]): number {
  const mouseY = e.clientY
  for (let i = 0; i < childElements.length; i++) {
    const rect = childElements[i].getBoundingClientRect()
    const midpoint = rect.top + rect.height / 2
    if (mouseY < midpoint) return i
  }
  return childElements.length
}
