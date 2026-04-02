import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EditorNode, TemplateLogic } from '@/types/node.types'
import { treeUtils } from '@/utils/treeUtils'
import { createDefaultTree } from '@/utils/defaultProps'

export const useEditorStore = defineStore('editor', () => {
  const tree = ref<EditorNode>(createDefaultTree())
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)
  const editingNodeId = ref<string | null>(null)
  const openSettingsTab = ref<string | null>(null)

  // Pure computed — no side effects, no default-prop merging
  const selectedNode = computed(() =>
    selectedId.value ? treeUtils.findById(tree.value, selectedId.value) ?? null : null
  )

  // ── UI state (no history needed) ──────────────────────────────────────────

  function select(id: string | null) { selectedId.value = id }
  function hover(id: string | null) { hoveredId.value = id }
  function startEditing(id: string) { editingNodeId.value = id }
  function stopEditing() { editingNodeId.value = null }
  function requestOpenSettings(tab: string) { openSettingsTab.value = tab }

  // ── Low-level primitives (called only by Command objects) ─────────────────
  // Prefixed with _ to signal "don't call directly from components".

  function _insert(node: EditorNode, parentId: string, index: number) {
    treeUtils.insert(tree.value, node, parentId, index)
  }

  function _remove(nodeId: string) {
    treeUtils.remove(tree.value, nodeId)
    if (selectedId.value === nodeId) selectedId.value = null
  }

  function _move(nodeId: string, targetParentId: string, index: number) {
    treeUtils.move(tree.value, nodeId, targetParentId, index)
  }

  function _updateProps(nodeId: string, props: Record<string, string>) {
    treeUtils.updateProps(tree.value, nodeId, props)
  }

  function _updateContent(nodeId: string, content: string) {
    treeUtils.updateContent(tree.value, nodeId, content)
  }

  function _updateTemplateLogic(nodeId: string, logic: Partial<TemplateLogic>) {
    const node = treeUtils.findById(tree.value, nodeId)
    if (!node) return
    node.templateLogic = { ...node.templateLogic, ...logic }
    if (!node.templateLogic.foreach) delete node.templateLogic.foreach
    if (!node.templateLogic.foreachAs) delete node.templateLogic.foreachAs
    if (!node.templateLogic.if) delete node.templateLogic.if
    if (Object.keys(node.templateLogic).length === 0) delete node.templateLogic
  }

  function _restoreTemplateLogic(nodeId: string, logic: TemplateLogic | undefined) {
    const node = treeUtils.findById(tree.value, nodeId)
    if (!node) return
    if (logic) node.templateLogic = logic
    else delete node.templateLogic
  }

  function _loadTree(newTree: EditorNode) {
    tree.value = newTree
    selectedId.value = null
  }

  return {
    tree, selectedId, hoveredId, editingNodeId, openSettingsTab, selectedNode,
    select, hover, startEditing, stopEditing, requestOpenSettings,
    _insert, _remove, _move, _updateProps, _updateContent,
    _updateTemplateLogic, _restoreTemplateLogic, _loadTree,
  }
})
