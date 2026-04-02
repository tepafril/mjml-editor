import type { EditorNode } from '@/types/node.types'
import { findParent, deepClone } from '@/utils/treeUtils'
import type { Command, EditorStorePrimitives } from './types'

export class DuplicateNodeCommand implements Command {
  description = 'Duplicate node'
  private clone: EditorNode | null = null
  private parentId: string | null = null
  private insertIndex = 0

  constructor(
    private store: EditorStorePrimitives,
    private nodeId: string,
  ) {}

  execute() {
    const parent = findParent(this.store.tree, this.nodeId)
    if (!parent) return
    const idx = parent.children.findIndex(c => c.id === this.nodeId)
    if (idx === -1) return
    this.clone = deepClone(parent.children[idx])
    this.parentId = parent.id
    this.insertIndex = idx + 1
    this.store._insert(this.clone, this.parentId, this.insertIndex)
  }

  undo() {
    if (this.clone) this.store._remove(this.clone.id)
  }
}
