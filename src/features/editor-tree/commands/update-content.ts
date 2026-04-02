import { findById } from '@/utils/treeUtils'
import type { Command, EditorStorePrimitives } from './types'

export class UpdateContentCommand implements Command {
  description = 'Update content'
  private previousContent: string

  constructor(
    private store: EditorStorePrimitives,
    private nodeId: string,
    private newContent: string,
  ) {
    const node = findById(store.tree, nodeId)
    this.previousContent = node?.content ?? ''
  }

  execute() {
    this.store._updateContent(this.nodeId, this.newContent)
  }

  undo() {
    this.store._updateContent(this.nodeId, this.previousContent)
  }
}
