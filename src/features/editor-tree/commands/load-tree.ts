import type { EditorNode } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'
import type { Command, EditorStorePrimitives, HeadStorePrimitives } from './types'

export class LoadTreeCommand implements Command {
  description = 'Load template'
  private previousTree: EditorNode
  private previousHead: HeadSettings

  constructor(
    private editorStore: EditorStorePrimitives,
    private headStore: HeadStorePrimitives,
    private newTree: EditorNode,
    private newHead: HeadSettings | undefined,
  ) {
    this.previousTree = JSON.parse(JSON.stringify(editorStore.tree))
    this.previousHead = JSON.parse(JSON.stringify(headStore.settings))
  }

  execute() {
    this.editorStore._loadTree(this.newTree)
    if (this.newHead) this.headStore.loadSettings(this.newHead)
  }

  undo() {
    this.editorStore._loadTree(this.previousTree)
    this.headStore.loadSettings(this.previousHead)
  }
}
