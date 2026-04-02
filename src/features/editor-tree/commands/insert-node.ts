import type { EditorNode } from '@/types/node.types'
import type { Command, EditorStorePrimitives } from './types'

export class InsertNodeCommand implements Command {
  description: string

  constructor(
    private store: EditorStorePrimitives,
    private node: EditorNode,
    private parentId: string,
    private index: number,
  ) {
    this.description = `Insert ${node.type}`
  }

  execute() {
    this.store._insert(this.node, this.parentId, this.index)
  }

  undo() {
    this.store._remove(this.node.id)
  }
}
