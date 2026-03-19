import type { EditorNode } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

// Pseudo-types that map to real MJML tags
const PSEUDO_TYPE_MAP: Record<string, string> = {
  'mj-heading': 'mj-text',
  'mj-avatar': 'mj-image',
}

function resolveTagName(type: string): string {
  return PSEUDO_TYPE_MAP[type] || type
}

function buildAttrsString(props: Record<string, string>): string {
  return Object.entries(props)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
    .join(' ')
}

export function serializeToMjml(node: EditorNode, indent = 0): string {
  if (node.hidden) return ''

  const pad = '  '.repeat(indent)
  const tagName = resolveTagName(node.type)
  const attrs = buildAttrsString(node.props)

  if (node.type === 'mj-body') {
    const childrenStr = node.children
      .filter(c => !c.hidden)
      .map(c => serializeToMjml(c, indent + 1))
      .filter(Boolean)
      .join('\n')
    const bodyAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<mj-body${bodyAttrs}>\n${childrenStr}\n${pad}</mj-body>`
  }

  const cssClass = ` css-class="node-${node.id}"`

  if (node.children.length > 0) {
    const childrenStr = node.children
      .filter(c => !c.hidden)
      .map(c => serializeToMjml(c, indent + 1))
      .filter(Boolean)
      .join('\n')
    const tagAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<${tagName}${tagAttrs}${cssClass}>\n${childrenStr}\n${pad}</${tagName}>`
  }

  if (node.content) {
    const tagAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<${tagName}${tagAttrs}${cssClass}>${node.content}</${tagName}>`
  }

  const tagAttrs = attrs ? ' ' + attrs : ''
  return `${pad}<${tagName}${tagAttrs}${cssClass} />`
}

function serializeHead(head?: HeadSettings): string {
  if (!head) return ''
  const parts: string[] = []

  if (head.title) parts.push(`    <mj-title>${head.title}</mj-title>`)
  if (head.previewText) parts.push(`    <mj-preview>${head.previewText}</mj-preview>`)
  if (head.breakpoint) parts.push(`    <mj-breakpoint width="${head.breakpoint}" />`)

  for (const font of head.fonts) {
    parts.push(`    <mj-font name="${escapeAttr(font.name)}" href="${escapeAttr(font.href)}" />`)
  }

  if (head.styles) {
    parts.push(`    <mj-style>\n${head.styles}\n    </mj-style>`)
  }

  const attrEntries = Object.entries(head.globalAttributes || {})
  if (attrEntries.length > 0) {
    const attrs = attrEntries.map(([tag, props]) => {
      const propsStr = Object.entries(props).filter(([, v]) => v).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')
      return `      <${tag} ${propsStr} />`
    }).join('\n')
    parts.push(`    <mj-attributes>\n${attrs}\n    </mj-attributes>`)
  }

  if (parts.length === 0) return ''
  return `  <mj-head>\n${parts.join('\n')}\n  </mj-head>\n`
}

export function buildFullMjml(root: EditorNode, head?: HeadSettings): string {
  const headBlock = serializeHead(head)
  const bodyContent = serializeToMjml(root, 1)
  return `<mjml>\n${headBlock}${bodyContent}\n</mjml>`
}

// --- Export versions (no css-class attributes) ---

export function buildExportMjml(node: EditorNode, indent = 0): string {
  if (node.hidden) return ''
  const pad = '  '.repeat(indent)
  const tagName = resolveTagName(node.type)
  const attrs = buildAttrsString(node.props)

  if (node.type === 'mj-body') {
    const childrenStr = node.children
      .filter(c => !c.hidden)
      .map(c => buildExportMjml(c, indent + 1))
      .filter(Boolean)
      .join('\n')
    const bodyAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<mj-body${bodyAttrs}>\n${childrenStr}\n${pad}</mj-body>`
  }

  if (node.children.length > 0) {
    const childrenStr = node.children
      .filter(c => !c.hidden)
      .map(c => buildExportMjml(c, indent + 1))
      .filter(Boolean)
      .join('\n')
    const tagAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<${tagName}${tagAttrs}>\n${childrenStr}\n${pad}</${tagName}>`
  }

  if (node.content) {
    const tagAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<${tagName}${tagAttrs}>${node.content}</${tagName}>`
  }

  const tagAttrs = attrs ? ' ' + attrs : ''
  return `${pad}<${tagName}${tagAttrs} />`
}

export function buildFullExportMjml(root: EditorNode, head?: HeadSettings): string {
  const headBlock = serializeHead(head)
  return `<mjml>\n${headBlock}${buildExportMjml(root, 1)}\n</mjml>`
}
