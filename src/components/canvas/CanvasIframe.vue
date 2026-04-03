<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const INLINE_EDITABLE_TYPES = new Set([
  'mj-text', 'mj-heading', 'mj-button',
  'mj-table',
  'mj-social-element', 'mj-navbar-link',
])

const props = defineProps<{
  html: string
  editingNodeId?: string | null
  nodeTypes?: Record<string, string>  // nodeId -> nodeType mapping
  toolbarActive?: boolean  // true when user is interacting with the inline edit toolbar
  showGridLines?: boolean
}>()

const emit = defineEmits<{
  'nodeClick': [nodeId: string]
  'nodeHover': [nodeId: string | null]
  'ready': [doc: Document]
  'iframeClick': []
  'editStart': [nodeId: string]
  'editEnd': [nodeId: string, content: string]
}>()

const iframeRef = ref<HTMLIFrameElement>()
let activeEditElement: HTMLElement | null = null

function getNodeIdFromElement(el: Element | null): string | null {
  while (el) {
    const classList = el.className?.split?.(' ') || []
    const nodeClass = classList.find((c: string) => c.startsWith('node-'))
    if (nodeClass) return nodeClass.replace('node-', '')
    el = el.parentElement
  }
  return null
}

/**
 * Find the innermost element that contains the actual text content.
 *
 * MJML applies css-class differently per component type:
 *   - mj-text/mj-heading: css-class goes on the <td> that wraps a <div> with text
 *   - mj-button: css-class goes on a <td> wrapping nested tables with an <a> inside
 *   - mj-table: css-class goes on a <td> wrapping the user's <table> content
 *
 * So rootEl is often a <td>, not an outer <div>.
 */
function findTextContainer(rootEl: Element, nodeType?: string): HTMLElement | null {
  const tag = rootEl.tagName?.toLowerCase()

  // For buttons and navbar links: find the <a> tag (the clickable text)
  if (nodeType === 'mj-button' || nodeType === 'mj-navbar-link') {
    const anchor = rootEl.querySelector('a[href]') || rootEl.querySelector('a')
    if (anchor) return anchor as HTMLElement
  }

  // For social elements: the text label is in a <td> next to the icon image.
  // MJML renders: <td> (icon) | <td> (text with <a> or plain text)
  // The css-class wraps the whole element, so we find the text-bearing <td>.
  if (nodeType === 'mj-social-element') {
    // Look for an <a> containing the label text
    const anchor = rootEl.querySelector('a')
    if (anchor && anchor.textContent?.trim()) return anchor as HTMLElement
    // Fallback: find the last <td> that has text (skips the icon td)
    const tds = rootEl.querySelectorAll('td')
    for (const td of Array.from(tds).reverse()) {
      if (td.textContent?.trim() && !td.querySelector('img')) {
        return td as HTMLElement
      }
    }
  }

  // For mj-table: find the user's <table> inside the wrapper
  if (nodeType === 'mj-table') {
    const userTable = rootEl.querySelector('table')
    if (userTable) return userTable as HTMLElement
    return rootEl as HTMLElement
  }

  // For mj-text / mj-heading / accordion-title / accordion-text:
  // If rootEl is a <td>, the content <div> is a direct child
  if (tag === 'td') {
    for (const child of Array.from(rootEl.children)) {
      const childTag = child.tagName?.toLowerCase()
      if (childTag === 'div' || childTag === 'p') {
        return child as HTMLElement
      }
    }
    // Fallback: use the td itself
    return rootEl as HTMLElement
  }

  // If rootEl is a <div> wrapping a table structure (some MJML versions),
  // drill down through the table to find the text container
  const tds = rootEl.querySelectorAll('td')
  for (const td of tds) {
    for (const child of Array.from(td.children)) {
      const childTag = child.tagName?.toLowerCase()
      if (childTag === 'div' || childTag === 'p') {
        return child as HTMLElement
      }
    }
  }

  // Last resort: if rootEl has text content, use it directly
  if (rootEl.textContent?.trim()) {
    return rootEl as HTMLElement
  }

  return null
}

function startInlineEdit(nodeId: string) {
  const doc = iframeRef.value?.contentDocument
  if (!doc) return

  const nodeEl = doc.querySelector(`.node-${nodeId}`)
  if (!nodeEl) return

  const nodeType = props.nodeTypes?.[nodeId]
  const textEl = findTextContainer(nodeEl, nodeType)
  if (!textEl) return

  // Inject editing styles once
  if (!doc.getElementById('inline-edit-styles')) {
    const style = doc.createElement('style')
    style.id = 'inline-edit-styles'
    style.textContent = `
      [contenteditable="true"] {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px;
        min-height: 1em;
        cursor: text !important;
      }
      [contenteditable="true"]:focus {
        outline: 2px solid #4f46e5 !important;
      }
    `
    doc.head.appendChild(style)
  }

  activeEditElement = textEl
  textEl.contentEditable = 'true'
  textEl.focus()

  // Select all text for easy replacement
  const range = doc.createRange()
  range.selectNodeContents(textEl)
  const sel = doc.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)

  // Listen for blur to commit
  textEl.addEventListener('blur', handleEditBlur)
  textEl.addEventListener('keydown', handleEditKeydown)
}

function stopInlineEdit() {
  if (!activeEditElement) return

  const nodeId = getNodeIdFromElement(activeEditElement)
  const content = activeEditElement.innerHTML

  activeEditElement.removeEventListener('blur', handleEditBlur)
  activeEditElement.removeEventListener('keydown', handleEditKeydown)
  activeEditElement.contentEditable = 'false'
  activeEditElement = null

  if (nodeId) {
    emit('editEnd', nodeId, content)
  }
}

function handleEditBlur() {
  // Delay to check if focus moved to the parent-document toolbar
  setTimeout(() => {
    if (props.toolbarActive) return  // toolbar is being used, don't end editing
    stopInlineEdit()
  }, 150)
}

function handleEditKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    // Blur triggers the commit via handleEditBlur
    activeEditElement?.blur()
  }
}

function injectInteractionScript() {
  const doc = iframeRef.value?.contentDocument
  if (!doc) return

  // Add hover/click styles
  const style = doc.createElement('style')
  style.textContent = `
    [class*="node-"] { cursor: pointer; }
    .node-hover-highlight { outline: 1px dashed #818cf8 !important; outline-offset: -1px; }
    .node-selected-highlight { outline: 2px solid #4f46e5 !important; outline-offset: -2px; }
  `
  doc.head.appendChild(style)
}

function setupIframeListeners() {
  const doc = iframeRef.value?.contentDocument
  if (!doc) return

  doc.addEventListener('click', (e: MouseEvent) => {
    // Don't intercept clicks when inline editing
    if (activeEditElement) return

    const nodeId = getNodeIdFromElement(e.target as Element)
    if (nodeId) {
      e.preventDefault()
      e.stopPropagation()
      emit('nodeClick', nodeId)
    } else {
      emit('iframeClick')
    }
  })

  doc.addEventListener('dblclick', (e: MouseEvent) => {
    // Don't start new edit if already editing
    if (activeEditElement) return

    const nodeId = getNodeIdFromElement(e.target as Element)
    if (!nodeId) return

    // Check if this node type supports inline editing
    const nodeType = props.nodeTypes?.[nodeId]
    if (!nodeType || !INLINE_EDITABLE_TYPES.has(nodeType)) return

    e.preventDefault()
    e.stopPropagation()
    emit('editStart', nodeId)
  })

  doc.addEventListener('mouseover', (e: MouseEvent) => {
    if (activeEditElement) return
    const nodeId = getNodeIdFromElement(e.target as Element)
    emit('nodeHover', nodeId)
  })

  doc.addEventListener('mouseout', () => {
    if (activeEditElement) return
    emit('nodeHover', null)
  })
}

// Grid lines overlay
const GRID_STYLE_ID = '__grid-lines-style'
const GRID_CSS = `[class*="node-"] { outline: 1px dashed rgba(99, 102, 241, 0.35) !important; }`

watch(() => props.showGridLines, (show) => {
  const doc = iframeRef.value?.contentDocument
  if (!doc) return
  const existing = doc.getElementById(GRID_STYLE_ID)
  if (show && !existing) {
    const style = doc.createElement('style')
    style.id = GRID_STYLE_ID
    style.textContent = GRID_CSS
    doc.head.appendChild(style)
  } else if (!show && existing) {
    existing.remove()
  }
})

// Watch for external edit start trigger
watch(() => props.editingNodeId, (nodeId) => {
  if (nodeId) {
    startInlineEdit(nodeId)
  } else if (activeEditElement) {
    stopInlineEdit()
  }
})

watch(() => props.html, (html) => {
  // Don't replace iframe content while editing
  if (activeEditElement) return

  const iframe = iframeRef.value
  if (!iframe) return

  const doc = iframe.contentDocument
  if (!doc) return

  doc.open()
  doc.write(html)
  doc.close()

  // Re-inject after content update
  setTimeout(() => {
    injectInteractionScript()
    setupIframeListeners()
    // Re-apply grid lines if active
    if (props.showGridLines) {
      const existing = doc.getElementById(GRID_STYLE_ID)
      if (!existing) {
        const style = doc.createElement('style')
        style.id = GRID_STYLE_ID
        style.textContent = GRID_CSS
        doc.head.appendChild(style)
      }
    }
    emit('ready', doc)
  }, 50)
})

onMounted(() => {
  if (props.html) {
    const doc = iframeRef.value?.contentDocument
    if (doc) {
      doc.open()
      doc.write(props.html)
      doc.close()
      setTimeout(() => {
        injectInteractionScript()
        setupIframeListeners()
        emit('ready', doc!)
      }, 50)
    }
  }
})
</script>

<template>
  <iframe
    ref="iframeRef"
    class="w-full h-full border-0 bg-white"
    sandbox="allow-same-origin allow-scripts"
  />
</template>
