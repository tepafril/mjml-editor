import { findParent } from '@/utils/treeUtils'
import type { Command, EditorStorePrimitives } from './types'

export class MoveNodeCommand implements Command {
  description = 'Move node'
  private originalParentId: string
  private originalIndex: number

  constructor(
    private store: EditorStorePrimitives,
    private nodeId: string,
    private newParentId: string,
    private newIndex: number,
  ) {
    const parent = findParent(store.tree, nodeId)
    if (!parent) throw new Error(`MoveNodeCommand: node ${nodeId} has no parent`)
    this.originalParentId = parent.id
    this.originalIndex = parent.children.findIndex(c => c.id === nodeId)
  }

  execute() {
    this.store._move(this.nodeId, this.newParentId, this.newIndex)
  }

  undo() {
    this.store._move(this.nodeId, this.originalParentId, this.originalIndex)
  }
}
