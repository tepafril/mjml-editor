import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EditorNode } from '@/types/node.types'
import { useHistoryStore } from './history.store'
import { treeUtils } from '@/utils/treeUtils'
import { createDefaultTree } from '@/utils/defaultProps'

export const useEditorStore = defineStore('editor', () => {
  const tree = ref<EditorNode>(createDefaultTree())
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)

  const historyStore = useHistoryStore()

  const selectedNode = computed(() =>
    selectedId.value ? treeUtils.findById(tree.value, selectedId.value) : null
  )

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

  return {
    tree, selectedId, hoveredId, selectedNode,
    selectNode, hoverNode, updateNodeProps, updateNodeContent,
    insertNode, moveNode, removeNode, duplicateNode, loadTree,
    undo, redo, canUndo, canRedo,
  }
})
