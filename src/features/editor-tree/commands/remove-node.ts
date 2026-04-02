import type { EditorNode } from '@/types/node.types'
import { findParent } from '@/utils/treeUtils'
import type { Command, EditorStorePrimitives } from './types'

export class RemoveNodeCommand implements Command {
  description = 'Remove node'
  private removedNode: EditorNode | null = null
  private parentId: string | null = null
  private index = 0

  constructor(
    private store: EditorStorePrimitives,
    private nodeId: string,
  ) {}

  execute() {
    const parent = findParent(this.store.tree, this.nodeId)
    if (!parent) return
    const idx = parent.children.findIndex(c => c.id === this.nodeId)
    if (idx === -1) return
    // Deep-copy preserves original IDs for a correct undo
    this.removedNode = JSON.parse(JSON.stringify(parent.children[idx]))
    this.parentId = parent.id
    this.index = idx
    this.store._remove(this.nodeId)
  }

  undo() {
    if (!this.removedNode || !this.parentId) return
    this.store._insert(this.removedNode, this.parentId, this.index)
  }
}
