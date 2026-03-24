import type { EditorNode } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

const CONTAINER_TYPES = new Set([
  'mj-section', 'mj-column', 'mj-wrapper', 'mj-group',
  'mj-hero', 'mj-social', 'mj-navbar', 'mj-accordion', 'mj-accordion-element',
])

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

  // Container types that accept children: ensure they have visible content
  const visibleChildren = node.children.filter(c => !c.hidden)

  if (visibleChildren.length > 0) {
    const childrenStr = visibleChildren
      .map(c => serializeToMjml(c, indent + 1))
      .filter(Boolean)
      .join('\n')
    const tagAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<${tagName}${tagAttrs}${cssClass}>\n${childrenStr}\n${pad}</${tagName}>`
  }

  // Empty containers: inject a placeholder so they have height and are droppable
  if (CONTAINER_TYPES.has(node.type)) {
    const inner = node.type === 'mj-section' || node.type === 'mj-wrapper' || node.type === 'mj-group'
      ? `${pad}  <mj-column>\n${pad}    <mj-text color="#aaaaaa" align="center" font-size="12px" padding="20px">Drop components here</mj-text>\n${pad}  </mj-column>`
      : `${pad}  <mj-text color="#aaaaaa" align="center" font-size="12px" padding="20px">Drop components here</mj-text>`
    const tagAttrs = attrs ? ' ' + attrs : ''
    return `${pad}<${tagName}${tagAttrs}${cssClass}>\n${inner}\n${pad}</${tagName}>`
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
