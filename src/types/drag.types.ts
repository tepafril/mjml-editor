import type { NodeType } from './node.types'

export interface DragSource {
  nodeId?: string
  nodeType?: NodeType
  savedSectionId?: string
}

export interface DropTarget {
  parentId: string
  index: number
}

export interface DragState {
  isDragging: boolean
  source: DragSource | null
  ghostPosition: { x: number; y: number }
  dropParentId: string | null
  dropIndex: number
  dragOverNodeId: string | null
}
