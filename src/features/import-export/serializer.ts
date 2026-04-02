import type { EditorNode } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'

export interface SerializeOptions {
  mode: 'preview' | 'export'
}

// Pseudo-types that the editor uses but don't exist in the MJML spec.
// On serialization they map to the underlying MJML tag.
const PSEUDO_TYPE_MAP: Record<string, string> = {
  'mj-heading': 'mj-text',
  'mj-avatar': 'mj-image',
}

// Container types that can be empty in the tree but still need a valid
// placeholder element in preview mode so the canvas renders a drop target.
const CONTAINER_TYPES = new Set([
  'mj-section', 'mj-column', 'mj-wrapper', 'mj-group',
  'mj-hero', 'mj-social', 'mj-navbar',
])

function resolveTag(type: string): string {
  return PSEUDO_TYPE_MAP[type] ?? type
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function buildAttrsString(props: Record<string, string>): string {
  return Object.entries(props)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}="${escapeAttr(v)}"`)
    .join(' ')
}

/**
 * Serialize a single node (and its subtree) to an MJML fragment string.
 * Use `serialize()` for a full `<mjml>` document.
 */
export function serializeNode(node: EditorNode, indent = 0, opts: SerializeOptions): string {
  if (node.hidden) return ''

  const pad = '  '.repeat(indent)
  const tagName = resolveTag(node.type)
  const attrs = buildAttrsString(node.props)
  const tagAttrs = attrs ? ' ' + attrs : ''

  // mj-body never receives a css-class injection
  if (node.type === 'mj-body') {
    const childrenStr = node.children
      .filter(c => !c.hidden)
      .map(c => serializeNode(c, indent + 1, opts))
      .filter(Boolean)
      .join('\n')
    return `${pad}<mj-body${tagAttrs}>\n${childrenStr}\n${pad}</mj-body>`
  }

  // In preview mode each non-body node gets a css-class for canvas selection
  const cssClass = opts.mode === 'preview' ? ` css-class="node-${node.id}"` : ''

  const visibleChildren = node.children.filter(c => !c.hidden)

  if (visibleChildren.length > 0) {
    const childrenStr = visibleChildren
      .map(c => serializeNode(c, indent + 1, opts))
      .filter(Boolean)
      .join('\n')
    return `${pad}<${tagName}${tagAttrs}${cssClass}>\n${childrenStr}\n${pad}</${tagName}>`
  }

  // Empty containers: inject a drop-target placeholder in preview mode only
  if (CONTAINER_TYPES.has(node.type) && opts.mode === 'preview') {
    const needsColumn = node.type === 'mj-section' || node.type === 'mj-wrapper' || node.type === 'mj-group'
    const inner = needsColumn
      ? `${pad}  <mj-column>\n${pad}    <mj-text color="#aaaaaa" align="center" font-size="12px" padding="20px">Drop components here</mj-text>\n${pad}  </mj-column>`
      : `${pad}  <mj-text color="#aaaaaa" align="center" font-size="12px" padding="20px">Drop components here</mj-text>`
    return `${pad}<${tagName}${tagAttrs}${cssClass}>\n${inner}\n${pad}</${tagName}>`
  }

  if (node.content) {
    return `${pad}<${tagName}${tagAttrs}${cssClass}>${node.content}</${tagName}>`
  }

  return `${pad}<${tagName}${tagAttrs}${cssClass} />`
}

function serializeHead(head: HeadSettings): string {
  const parts: string[] = []

  if (head.title) parts.push(`    <mj-title>${head.title}</mj-title>`)
  if (head.previewText) parts.push(`    <mj-preview>${head.previewText}</mj-preview>`)
  if (head.breakpoint) parts.push(`    <mj-breakpoint width="${head.breakpoint}" />`)

  for (const font of head.fonts) {
    if (font.href) {
      parts.push(`    <mj-font name="${escapeAttr(font.name)}" href="${escapeAttr(font.href)}" />`)
    }
  }

  if (head.styles) {
    parts.push(`    <mj-style>\n${head.styles}\n    </mj-style>`)
  }

  const attrEntries = Object.entries(head.globalAttributes ?? {})
  if (attrEntries.length > 0) {
    const rows = attrEntries
      .map(([tag, props]) => {
        const validProps = Object.entries(props).filter(([k, v]) => v && k !== '_placeholder')
        if (validProps.length === 0) return ''
        const propsStr = validProps.map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ')
        if (tag.startsWith('mj-class.')) {
          const className = tag.replace('mj-class.', '')
          return `      <mj-class name="${escapeAttr(className)}" ${propsStr} />`
        }
        return `      <${tag} ${propsStr} />`
      })
      .filter(Boolean)
      .join('\n')
    if (rows) parts.push(`    <mj-attributes>\n${rows}\n    </mj-attributes>`)
  }

  const htmlAttrs = (head.htmlAttributes ?? []).filter(
    s => s.path && Object.keys(s.attributes).length > 0,
  )
  if (htmlAttrs.length > 0) {
    const selectors = htmlAttrs
      .map(s => {
        const attrTags = Object.entries(s.attributes)
          .filter(([, v]) => v !== undefined)
          .map(([name, value]) =>
            `        <mj-html-attribute name="${escapeAttr(name)}">${escapeAttr(value)}</mj-html-attribute>`,
          )
          .join('\n')
        return `      <mj-selector path="${escapeAttr(s.path)}">\n${attrTags}\n      </mj-selector>`
      })
      .join('\n')
    parts.push(`    <mj-html-attributes>\n${selectors}\n    </mj-html-attributes>`)
  }

  if (parts.length === 0) return ''
  return `  <mj-head>\n${parts.join('\n')}\n  </mj-head>\n`
}

/**
 * Serialize a full editor tree + head settings into a complete MJML document string.
 *
 * @param root    The mj-body EditorNode (root of the tree)
 * @param head    Optional head settings (fonts, styles, global attrs…)
 * @param opts    `mode: 'preview'` injects css-class markers and drop-target
 *                placeholders; `mode: 'export'` produces clean MJML.
 */
export function serialize(
  root: EditorNode,
  head: HeadSettings | undefined,
  opts: SerializeOptions,
): string {
  const headBlock = head ? serializeHead(head) : ''
  const bodyContent = serializeNode(root, 1, opts)
  return `<mjml>\n${headBlock}${bodyContent}\n</mjml>`
}
