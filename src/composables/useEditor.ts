import { computed } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import { useHistoryStore } from '@/stores/history.store'
import { useDragStore } from '@/stores/drag.store'
import { useHeadStore } from '@/stores/head.store'
import { usePreviewStore } from '@/stores/preview.store'
import { useCompilationStore } from '@/features/compilation/store'
import {
  InsertNodeCommand,
  RemoveNodeCommand,
  MoveNodeCommand,
  UpdatePropsCommand,
  UpdateContentCommand,
  DuplicateNodeCommand,
  UpdateTemplateLogicCommand,
  LoadTreeCommand,
} from '@/features/editor-tree/commands'
import type { EditorNode, TemplateLogic } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'
import { NODE_DEFAULT_PROPS } from '@/types/mjml.types'

/**
 * Single entry point for all editor operations.
 *
 * Components import ONLY this composable. All tree mutations flow through
 * the Command pattern so every operation is automatically undoable.
 *
 * Sub-stores (drag, preview, head) are exposed directly because they
 * manage mutable UI state that components need to set freely.
 */
export function useEditor() {
  const editorStore = useEditorStore()
  const historyStore = useHistoryStore()
  const dragStore = useDragStore()
  const headStore = useHeadStore()
  const previewStore = usePreviewStore()
  const compilationStore = useCompilationStore()

  // selectedNode with default props merged in — NO side effects on the store
  const _mergedSelectedNode = computed(() => {
    const raw = editorStore.selectedNode
    if (!raw) return null
    const defaults = NODE_DEFAULT_PROPS[raw.type] || {}
    return { ...raw, props: { ...defaults, ...raw.props } }
  })

  // ── Tree mutations (all go through command + history) ─────────────────────

  function insertNode(node: EditorNode, parentId: string, index: number) {
    historyStore.execute(new InsertNodeCommand(editorStore, node, parentId, index))
  }

  function removeNode(nodeId: string) {
    historyStore.execute(new RemoveNodeCommand(editorStore, nodeId))
  }

  function moveNode(nodeId: string, targetParentId: string, index: number) {
    historyStore.execute(new MoveNodeCommand(editorStore, nodeId, targetParentId, index))
  }

  function updateProps(nodeId: string, props: Record<string, string>) {
    historyStore.execute(new UpdatePropsCommand(editorStore, nodeId, props))
  }

  function updateContent(nodeId: string, content: string) {
    historyStore.execute(new UpdateContentCommand(editorStore, nodeId, content))
  }

  function duplicateNode(nodeId: string) {
    historyStore.execute(new DuplicateNodeCommand(editorStore, nodeId))
  }

  function updateTemplateLogic(nodeId: string, logic: Partial<TemplateLogic>) {
    historyStore.execute(new UpdateTemplateLogicCommand(editorStore, nodeId, logic))
  }

  function loadTree(tree: EditorNode, head?: HeadSettings) {
    historyStore.execute(new LoadTreeCommand(editorStore, headStore, tree, head))
  }

  /**
   * Silently revert body props without creating a history entry.
   * Used by the Settings dialog "Cancel" to restore the snapshot taken on open.
   */
  function revertBodyProps(props: Record<string, string>) {
    editorStore._updateProps(editorStore.tree.id, props)
  }

  return {
    // ── Tree state (reactive via Pinia store getters) ──────────────────────
    get tree() { return editorStore.tree },
    get selectedId() { return editorStore.selectedId },
    get selectedNode() { return _mergedSelectedNode.value },
    get hoveredId() { return editorStore.hoveredId },
    get editingNodeId() { return editorStore.editingNodeId },
    get openSettingsTab() { return editorStore.openSettingsTab },

    // ── Tree mutations ─────────────────────────────────────────────────────
    insertNode,
    removeNode,
    moveNode,
    updateProps,
    updateContent,
    duplicateNode,
    updateTemplateLogic,
    loadTree,
    revertBodyProps,

    // ── UI state (no history needed) ──────────────────────────────────────
    select: editorStore.select,
    hover: editorStore.hover,
    startEditing: editorStore.startEditing,
    stopEditing: editorStore.stopEditing,
    requestOpenSettings: editorStore.requestOpenSettings,
    clearOpenSettingsTab() { editorStore.openSettingsTab = null },

    // ── History ───────────────────────────────────────────────────────────
    undo: historyStore.undo,
    redo: historyStore.redo,
    get canUndo() { return historyStore.canUndo },
    get canRedo() { return historyStore.canRedo },

    // ── Sub-stores (direct access for mutable UI state) ───────────────────
    drag: dragStore,
    preview: previewStore,
    head: headStore,

    // ── Compilation ───────────────────────────────────────────────────────
    get compiledHtml() { return compilationStore.compiledHtml },
    get mjmlSource() { return compilationStore.mjmlSource },
    get compileError() { return compilationStore.compileError },
    pauseCompiler() { compilationStore.pause() },
    resumeCompiler() { compilationStore.resume() },
  }
}
