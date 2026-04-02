import { findById } from '@/utils/treeUtils'
import type { Command, EditorStorePrimitives } from './types'

export class UpdatePropsCommand implements Command {
  description = 'Update props'
  private previousValues: Record<string, string>

  constructor(
    private store: EditorStorePrimitives,
    private nodeId: string,
    private nextProps: Record<string, string>,
  ) {
    const node = findById(store.tree, nodeId)
    this.previousValues = {}
    if (node) {
      for (const key of Object.keys(nextProps)) {
        this.previousValues[key] = node.props[key] ?? ''
      }
    }
  }

  execute() {
    this.store._updateProps(this.nodeId, this.nextProps)
  }

  undo() {
    this.store._updateProps(this.nodeId, this.previousValues)
  }
}
