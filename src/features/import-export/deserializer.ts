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
])

// The placeholder text injected by the serializer in preview mode.
// We strip it on parse so it doesn't appear as real content.
const PLACEHOLDER_TEXT = 'Drop components here'

function parseAttributes(el: Element): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const attr of Array.from(el.attributes)) {
    // css-class is editor-injected; mj-class is resolved through head — skip both
    if (attr.name === 'css-class' || attr.name === 'mj-class') continue
    attrs[attr.name] = attr.value
  }
  return attrs
}

/**
 * Infer whether a standard MJML tag should be treated as an editor pseudo-type.
 *
 * Identity signals:
 *   mj-text  + font-weight=bold + font-size >= 20px  → mj-heading
 *   mj-image + border-radius=50%                     → mj-avatar
 */
function inferPseudoType(tagName: string, props: Record<string, string>): NodeType {
  if (tagName === 'mj-text') {
    const size = parseInt(props['font-size'] ?? '13', 10)
    if (props['font-weight'] === 'bold' && size >= 20) return 'mj-heading'
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

  // Recurse into children that are valid MJML tags
  const validChildElements = Array.from(el.children).filter(c =>
    VALID_TYPES.has(c.tagName.toLowerCase()),
  )

  let children: EditorNode[] = []
  let content: string | undefined

  if (validChildElements.length > 0) {
    children = validChildElements
      .map(c => elementToNode(c))
      .filter((n): n is EditorNode => n !== null)
  } else {
    const raw = el.innerHTML.trim()
    // Ignore preview-mode placeholder text injected by the serializer
    if (raw && !raw.includes(PLACEHOLDER_TEXT)) {
      content = raw
    }
  }

  // Merge defaults first so the editor immediately shows prop values,
  // then overlay the parsed attributes so explicit values always win.
  const defaultProps = NODE_DEFAULT_PROPS[type] ?? {}
  const props = { ...defaultProps, ...attrs }

  return { id: nanoid(), type, props, content, children }
}

function parseHead(doc: Document): HeadSettings {
  const head = createDefaultHeadSettings()
  const mjHead = doc.querySelector('mj-head')
  if (!mjHead) return head

  const titleEl = mjHead.querySelector('mj-title')
  if (titleEl) head.title = titleEl.textContent?.trim() ?? ''

  const previewEl = mjHead.querySelector('mj-preview')
  if (previewEl) head.previewText = previewEl.textContent?.trim() ?? ''

  const breakpointEl = mjHead.querySelector('mj-breakpoint')
  if (breakpointEl) head.breakpoint = breakpointEl.getAttribute('width') ?? ''

  // Replace the default font list with whatever is declared in the file
  const fontEls = mjHead.querySelectorAll('mj-font')
  if (fontEls.length > 0) {
    head.fonts = []
    for (const font of fontEls) {
      const name = font.getAttribute('name')
      const href = font.getAttribute('href')
      if (name && href) head.fonts.push({ name, href })
    }
  }

  const styleEl = mjHead.querySelector('mj-style')
  if (styleEl) head.styles = styleEl.textContent?.trim() ?? ''

  const attributesEl = mjHead.querySelector('mj-attributes')
  if (attributesEl) {
    for (const child of Array.from(attributesEl.children)) {
      const tag = child.tagName.toLowerCase()
      if (!tag.startsWith('mj-')) continue

      const props: Record<string, string> = {}
      for (const attr of Array.from(child.attributes)) {
        props[attr.name] = attr.value
      }
      if (Object.keys(props).length === 0) continue

      if (tag === 'mj-class' && props.name) {
        // Store as "mj-class.{name}" with the name attr removed
        const className = props.name
        const { name: _name, ...rest } = props
        head.globalAttributes[`mj-class.${className}`] = rest
      } else {
        head.globalAttributes[tag] = props
      }
    }
  }

  const htmlAttrsEl = mjHead.querySelector('mj-html-attributes')
  if (htmlAttrsEl) {
    for (const selectorEl of Array.from(htmlAttrsEl.querySelectorAll('mj-selector'))) {
      const path = selectorEl.getAttribute('path')
      if (!path) continue

      const attrMap: Record<string, string> = {}
      for (const attrEl of Array.from(selectorEl.querySelectorAll('mj-html-attribute'))) {
        const name = attrEl.getAttribute('name')
        if (name) attrMap[name] = attrEl.textContent?.trim() ?? ''
      }
      if (Object.keys(attrMap).length > 0) {
        head.htmlAttributes.push({ path, attributes: attrMap })
      }
    }
  }

  return head
}

/**
 * Parse an MJML string into an EditorNode tree + HeadSettings.
 *
 * Uses `text/html` parsing so HTML entities (&nbsp;, &copy; etc.) survive
 * the round-trip without becoming garbled.
 *
 * @throws if the string contains no `<mj-body>` element.
 */
export function deserialize(mjmlString: string): { tree: EditorNode; head: HeadSettings } {
  const parser = new DOMParser()
  const doc = parser.parseFromString(mjmlString, 'text/html')

  const mjBody = doc.querySelector('mj-body')
  if (!mjBody) throw new Error('Invalid MJML: no mj-body found')

  const body = elementToNode(mjBody)
  if (!body) throw new Error('Failed to parse mj-body')

  const head = parseHead(doc)
  return { tree: body, head }
}
