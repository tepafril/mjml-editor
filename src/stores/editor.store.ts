import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EditorNode, TemplateLogic } from '@/types/node.types'
import { NODE_DEFAULT_PROPS } from '@/types/mjml.types'
import { useHistoryStore } from './history.store'
import { treeUtils } from '@/utils/treeUtils'
import { createDefaultTree } from '@/utils/defaultProps'

export const useEditorStore = defineStore('editor', () => {
  const tree = ref<EditorNode>(createDefaultTree())
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)
  const editingNodeId = ref<string | null>(null)

  const historyStore = useHistoryStore()

  const selectedNode = computed(() => {
    const node = selectedId.value ? treeUtils.findById(tree.value, selectedId.value) : null
    if (node) {
      // Merge in any missing default props so the UI always shows all fields
      const defaults = NODE_DEFAULT_PROPS[node.type]
      if (defaults) {
        for (const key in defaults) {
          if (!(key in node.props)) {
            node.props[key] = defaults[key]
          }
        }
      }
    }
    return node
  })

  const canUndo = computed(() => historyStore.canUndo)
  const canRedo = computed(() => historyStore.canRedo)

  function snapshot() {
    historyStore.push(JSON.stringify(tree.value))
  }

  function selectNode(id: string | null) {
    selectedId.value = id
  }

  function hoverNode(id: string | null) {
    hoveredId.value = id
  }

  function updateNodeProps(id: string, props: Record<string, string>) {
    snapshot()
    treeUtils.updateProps(tree.value, id, props)
  }

  function updateNodeContent(id: string, content: string) {
    snapshot()
    treeUtils.updateContent(tree.value, id, content)
  }

  function insertNode(node: EditorNode, parentId: string, index: number) {
    snapshot()
    treeUtils.insert(tree.value, node, parentId, index)
  }

  function moveNode(nodeId: string, targetParentId: string, index: number) {
    snapshot()
    treeUtils.move(tree.value, nodeId, targetParentId, index)
  }

  function removeNode(id: string) {
    snapshot()
    treeUtils.remove(tree.value, id)
    if (selectedId.value === id) selectedId.value = null
  }

  function duplicateNode(id: string) {
    snapshot()
    treeUtils.duplicate(tree.value, id)
  }

  function loadTree(newTree: EditorNode) {
    snapshot()
    tree.value = newTree
    selectedId.value = null
  }

  function undo() {
    const prev = historyStore.popUndo()
    if (!prev) return
    historyStore.pushRedo(JSON.stringify(tree.value))
    tree.value = JSON.parse(prev)
    selectedId.value = null
  }

  function redo() {
    const next = historyStore.popRedo()
    if (!next) return
    historyStore.push(JSON.stringify(tree.value))
    tree.value = JSON.parse(next)
    selectedId.value = null
  }

  function updateNodeTemplateLogic(id: string, logic: Partial<TemplateLogic>) {
    snapshot()
    const node = treeUtils.findById(tree.value, id)
    if (!node) return
    node.templateLogic = { ...node.templateLogic, ...logic }
    if (!node.templateLogic.foreach) delete node.templateLogic.foreach
    if (!node.templateLogic.foreachAs) delete node.templateLogic.foreachAs
    if (!node.templateLogic.if) delete node.templateLogic.if
    if (Object.keys(node.templateLogic).length === 0) delete node.templateLogic
  }

  function startEditing(id: string) {
    editingNodeId.value = id
  }

  function stopEditing() {
    editingNodeId.value = null
  }

  // Global request to open settings dialog on a specific tab
  const openSettingsTab = ref<string | null>(null)

  function requestOpenSettings(tab: string) {
    openSettingsTab.value = tab
  }

  return {
    tree, selectedId, hoveredId, editingNodeId, selectedNode,
    selectNode, hoverNode, updateNodeProps, updateNodeContent,
    insertNode, moveNode, removeNode, duplicateNode, loadTree,
    updateNodeTemplateLogic, startEditing, stopEditing,
    undo, redo, canUndo, canRedo,
    openSettingsTab, requestOpenSettings,
  }
})
