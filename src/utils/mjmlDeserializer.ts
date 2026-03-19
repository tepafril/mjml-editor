import { nanoid } from 'nanoid'
import type { EditorNode, NodeType } from '@/types/node.types'
import { NODE_DEFAULT_PROPS } from '@/types/mjml.types'

const VALID_TYPES = new Set<string>([
  'mj-body', 'mj-section', 'mj-column', 'mj-text',
  'mj-button', 'mj-image', 'mj-divider', 'mj-spacer',
  'mj-wrapper', 'mj-hero', 'mj-group',
  'mj-social', 'mj-social-element',
  'mj-navbar', 'mj-navbar-link',
  'mj-table', 'mj-raw',
  'mj-carousel', 'mj-carousel-image',
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

export function deserializeFromMjml(mjmlString: string): EditorNode {
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

  return body
}
