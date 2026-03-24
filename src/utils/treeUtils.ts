import type { EditorNode } from '@/types/node.types'
import { nanoid } from 'nanoid'

export function findById(root: EditorNode, id: string): EditorNode | null {
  if (root.id === id) return root
  for (const child of root.children) {
    const found = findById(child, id)
    if (found) return found
  }
  return null
}

export function findParent(root: EditorNode, id: string): EditorNode | null {
  for (const child of root.children) {
    if (child.id === id) return root
    const found = findParent(child, id)
    if (found) return found
  }
  return null
}

export function flatten(root: EditorNode): EditorNode[] {
  const result: EditorNode[] = [root]
  for (const child of root.children) {
    result.push(...flatten(child))
  }
  return result
}

export function insert(root: EditorNode, node: EditorNode, parentId: string, index: number) {
  const parent = findById(root, parentId)
  if (!parent) return
  const i = Math.min(Math.max(0, index), parent.children.length)
  parent.children.splice(i, 0, node)
}

export function remove(root: EditorNode, id: string): EditorNode | null {
  const parent = findParent(root, id)
  if (!parent) return null
  const idx = parent.children.findIndex(c => c.id === id)
  if (idx === -1) return null
  return parent.children.splice(idx, 1)[0]
}

export function move(root: EditorNode, nodeId: string, targetParentId: string, index: number) {
  const node = remove(root, nodeId)
  if (!node) return
  insert(root, node, targetParentId, index)
}

export function updateProps(root: EditorNode, id: string, props: Record<string, string>) {
  const node = findById(root, id)
  if (!node) return
  Object.assign(node.props, props)
}

export function updateContent(root: EditorNode, id: string, content: string) {
  const node = findById(root, id)
  if (!node) return
  node.content = content
}

export function deepClone(node: EditorNode): EditorNode {
  return {
    ...node,
    id: nanoid(),
    props: { ...node.props },
    children: node.children.map(deepClone),
    templateLogic: node.templateLogic ? { ...node.templateLogic } : undefined,
  }
}

export function duplicate(root: EditorNode, id: string) {
  const parent = findParent(root, id)
  if (!parent) return
  const idx = parent.children.findIndex(c => c.id === id)
  if (idx === -1) return
  const clone = deepClone(parent.children[idx])
  parent.children.splice(idx + 1, 0, clone)
}

export function getAncestorIds(root: EditorNode, id: string): string[] {
  const ids: string[] = []
  let current = id
  while (true) {
    const parent = findParent(root, current)
    if (!parent) break
    ids.push(parent.id)
    current = parent.id
  }
  return ids
}

export const treeUtils = {
  findById,
  findParent,
  flatten,
  insert,
  remove,
  move,
  updateProps,
  updateContent,
  deepClone,
  duplicate,
  getAncestorIds,
}
