import { ref } from 'vue'
import { nanoid } from 'nanoid'
import type { EditorNode } from '@/types/node.types'
import { serializeNode } from '@/features/import-export'
// @ts-expect-error mjml-browser has no types
import mjml2html from 'mjml-browser'

const STORAGE_KEY = 'mjml-editor:saved-sections'

export interface SavedSection {
  id: string
  name: string
  nodeType: string
  createdAt: number
  nodeJson: string
  previewHtml: string
}

function generatePreviewHtml(node: EditorNode): string {
  try {
    const nodeMjml = serializeNode(node, 2, { mode: 'preview' })
    let bodyContent: string
    if (['mj-section', 'mj-wrapper', 'mj-hero'].includes(node.type)) {
      bodyContent = nodeMjml
    } else if (node.type === 'mj-column') {
      bodyContent = `  <mj-section>\n${nodeMjml}\n  </mj-section>`
    } else {
      bodyContent = `  <mj-section>\n    <mj-column>\n${nodeMjml}\n    </mj-column>\n  </mj-section>`
    }
    const fullMjml = `<mjml>\n  <mj-body>\n${bodyContent}\n  </mj-body>\n</mjml>`
    const { html } = mjml2html(fullMjml, { validationLevel: 'skip' })
    return html || ''
  } catch {
    return ''
  }
}

function cloneWithNewIds(node: EditorNode): EditorNode {
  return {
    ...node,
    id: nanoid(),
    children: node.children.map(cloneWithNewIds),
  }
}

function loadFromStorage(): SavedSection[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const sections = JSON.parse(raw) as SavedSection[]
    // Migrate: generate preview for any entries missing it
    let needsPersist = false
    for (const s of sections) {
      if (!s.previewHtml) {
        const node = JSON.parse(s.nodeJson) as EditorNode
        s.previewHtml = generatePreviewHtml(node)
        needsPersist = true
      }
    }
    if (needsPersist) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
    }
    return sections
  } catch {
    return []
  }
}

function persist(sections: SavedSection[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections))
}

// Shared reactive state — module-level singleton
const savedSections = ref<SavedSection[]>(loadFromStorage())

export function useSavedSections() {
  function saveNode(node: EditorNode, name: string) {
    const entry: SavedSection = {
      id: nanoid(),
      name,
      nodeType: node.type,
      createdAt: Date.now(),
      nodeJson: JSON.stringify(node),
      previewHtml: generatePreviewHtml(node),
    }
    savedSections.value = [entry, ...savedSections.value]
    persist(savedSections.value)
  }

  function deleteSection(id: string) {
    savedSections.value = savedSections.value.filter(s => s.id !== id)
    persist(savedSections.value)
  }

  function cloneNode(section: SavedSection): EditorNode {
    const node = JSON.parse(section.nodeJson) as EditorNode
    return cloneWithNewIds(node)
  }

  return { savedSections, saveNode, deleteSection, cloneNode }
}
