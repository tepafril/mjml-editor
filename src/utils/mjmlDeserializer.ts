import { nanoid } from 'nanoid'
import type { EditorNode, NodeType } from '@/types/node.types'
import { NODE_DEFAULT_PROPS, type HeadSettings, createDefaultHeadSettings } from '@/types/mjml.types'

const VALID_TYPES = new Set<string>([
  'mj-body', 'mj-section', 'mj-column', 'mj-text',
  'mj-button', 'mj-image', 'mj-divider', 'mj-spacer',
  'mj-wrapper', 'mj-hero', 'mj-group',
  'mj-social', 'mj-social-element',
  'mj-navbar', 'mj-navbar-link',
  'mj-table', 'mj-raw',
  'mj-accordion', 'mj-accordion-element',
  'mj-accordion-title', 'mj-accordion-text',
])

function parseAttributes(el: Element): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const attr of Array.from(el.attributes)) {
    if (attr.name === 'css-class' || attr.name === 'mj-class') continue
    attrs[attr.name] = attr.value
  }
  return attrs
}

function inferPseudoType(tagName: string, props: Record<string, string>): NodeType {
  if (tagName === 'mj-text' && props['font-weight'] === 'bold' && parseInt(props['font-size'] || '14') >= 20) {
    return 'mj-heading'
  }
  if (tagName === 'mj-image' && props['border-radius'] === '50%') {
    return 'mj-avatar'
  }
  return tagName as NodeType
}

function elementToNode(el: Element): EditorNode | null {
  const tagName = el.tagName.toLowerCase()

  if (!VALID_TYPES.has(tagName)) return null

  const attrs = parseAttributes(el)
  const type = inferPseudoType(tagName, attrs)

  const children: EditorNode[] = []
  let content: string | undefined

  const childElements = Array.from(el.children)
  if (childElements.length > 0 && childElements.some(c => VALID_TYPES.has(c.tagName.toLowerCase()))) {
    for (const child of childElements) {
      const childNode = elementToNode(child)
      if (childNode) children.push(childNode)
    }
  } else {
    const textContent = el.innerHTML.trim()
    if (textContent && !textContent.startsWith('<mj-')) {
      content = textContent
    }
  }

  const defaultProps = NODE_DEFAULT_PROPS[type] || {}
  const mergedProps = { ...defaultProps, ...attrs }

  return {
    id: nanoid(),
    type,
    props: mergedProps,
    content,
    children,
  }
}

function parseHead(doc: Document): HeadSettings {
  const head = createDefaultHeadSettings()
  const mjHead = doc.querySelector('mj-head')
  if (!mjHead) return head

  const title = mjHead.querySelector('mj-title')
  if (title) head.title = title.textContent?.trim() || ''

  const preview = mjHead.querySelector('mj-preview')
  if (preview) head.previewText = preview.textContent?.trim() || ''

  const breakpoint = mjHead.querySelector('mj-breakpoint')
  if (breakpoint) head.breakpoint = breakpoint.getAttribute('width') || ''

  const fonts = mjHead.querySelectorAll('mj-font')
  for (const font of fonts) {
    const name = font.getAttribute('name')
    const href = font.getAttribute('href')
    if (name && href) head.fonts.push({ name, href })
  }

  const style = mjHead.querySelector('mj-style')
  if (style) head.styles = style.textContent?.trim() || ''

  const attributes = mjHead.querySelector('mj-attributes')
  if (attributes) {
    for (const child of Array.from(attributes.children)) {
      const tag = child.tagName.toLowerCase()
      if (!tag.startsWith('mj-')) continue
      const props: Record<string, string> = {}
      for (const attr of Array.from(child.attributes)) {
        props[attr.name] = attr.value
      }
      if (Object.keys(props).length > 0) {
        head.globalAttributes[tag] = props
      }
    }
  }

  return head
}

export function deserializeFromMjml(mjmlString: string): { tree: EditorNode; head: HeadSettings } {
  const parser = new DOMParser()
  const doc = parser.parseFromString(mjmlString, 'text/xml')

  const mjBody = doc.querySelector('mj-body')
  if (!mjBody) {
    throw new Error('Invalid MJML: no mj-body found')
  }

  const body = elementToNode(mjBody)
  if (!body) {
    throw new Error('Failed to parse mj-body')
  }

  const head = parseHead(doc)

  return { tree: body, head }
}
