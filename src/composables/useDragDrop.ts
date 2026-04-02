import { useEditor } from '@/composables/useEditor'
import { createNode } from '@/utils/defaultProps'
import type { DragSource } from '@/types/drag.types'
import type { NodeType } from '@/types/node.types'

export function useDragDrop() {
  const editor = useEditor()

  function onDragStart(e: DragEvent, source: DragSource) {
    editor.drag.startDrag(source)
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
    editor.drag.ghostPosition = { x: e.clientX, y: e.clientY }
    editor.drag.dropParentId = parentId
    editor.drag.dragOverNodeId = parentId
    editor.drag.dropIndex = childElements?.length
      ? calculateDropIndex(e, childElements)
      : 0
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    const { dragSource, dropParentId, dropIndex } = editor.drag
    if (!dropParentId || !dragSource) return

    if (dragSource.nodeType) {
      const newNode = createNode(dragSource.nodeType as NodeType)
      editor.insertNode(newNode, dropParentId, dropIndex)
      editor.select(newNode.id)
    } else if (dragSource.nodeId) {
      editor.moveNode(dragSource.nodeId, dropParentId, dropIndex)
    }

    editor.drag.endDrag()
  }

  function onDragEnd() {
    editor.drag.endDrag()
  }

  return { onDragStart, onDragOver, onDrop, onDragEnd }
}

function calculateDropIndex(e: DragEvent, childElements: HTMLElement[]): number {
  const mouseY = e.clientY
  for (let i = 0; i < childElements.length; i++) {
    const rect = childElements[i].getBoundingClientRect()
    if (mouseY < rect.top + rect.height / 2) return i
  }
  return childElements.length
}
