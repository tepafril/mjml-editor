import type { TemplateLogic } from '@/types/node.types'
import { findById } from '@/utils/treeUtils'
import type { Command, EditorStorePrimitives } from './types'

export class UpdateTemplateLogicCommand implements Command {
  description = 'Update template logic'
  private previousLogic: TemplateLogic | undefined

  constructor(
    private store: EditorStorePrimitives,
    private nodeId: string,
    private newLogic: Partial<TemplateLogic>,
  ) {
    const node = findById(store.tree, nodeId)
    this.previousLogic = node?.templateLogic ? { ...node.templateLogic } : undefined
  }

  execute() {
    this.store._updateTemplateLogic(this.nodeId, this.newLogic)
  }

  undo() {
    this.store._restoreTemplateLogic(this.nodeId, this.previousLogic)
  }
}
