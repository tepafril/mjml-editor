import type { EditorNode, TemplateLogic } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'

export interface Command {
  execute(): void
  undo(): void
  description: string
}

/** Minimal interface commands need from the editor store */
export interface EditorStorePrimitives {
  tree: EditorNode
  _insert(node: EditorNode, parentId: string, index: number): void
  _remove(nodeId: string): void
  _move(nodeId: string, targetParentId: string, index: number): void
  _updateProps(nodeId: string, props: Record<string, string>): void
  _updateContent(nodeId: string, content: string): void
  _updateTemplateLogic(nodeId: string, logic: Partial<TemplateLogic>): void
  _restoreTemplateLogic(nodeId: string, logic: TemplateLogic | undefined): void
  _loadTree(tree: EditorNode): void
}

/** Minimal interface commands need from the head/settings store */
export interface HeadStorePrimitives {
  settings: HeadSettings
  loadSettings(s: HeadSettings): void
}
