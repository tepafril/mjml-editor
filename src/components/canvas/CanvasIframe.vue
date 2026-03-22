<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  html: string
}>()

const emit = defineEmits<{
  'nodeClick': [nodeId: string]
  'nodeHover': [nodeId: string | null]
  'ready': [doc: Document]
  'iframeClick': []
}>()

const iframeRef = ref<HTMLIFrameElement>()

function getNodeIdFromElement(el: Element | null): string | null {
  while (el) {
    const classList = el.className?.split?.(' ') || []
    const nodeClass = classList.find((c: string) => c.startsWith('node-'))
    if (nodeClass) return nodeClass.replace('node-', '')
    el = el.parentElement
  }
  return null
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
    const nodeId = getNodeIdFromElement(e.target as Element)
    if (nodeId) {
      e.preventDefault()
      e.stopPropagation()
      emit('nodeClick', nodeId)
    } else {
      emit('iframeClick')
    }
  })

  doc.addEventListener('mouseover', (e: MouseEvent) => {
    const nodeId = getNodeIdFromElement(e.target as Element)
    emit('nodeHover', nodeId)
  })

  doc.addEventListener('mouseout', () => {
    emit('nodeHover', null)
  })
}

watch(() => props.html, (html) => {
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
    class="w-full h-full border-0"
    sandbox="allow-same-origin"
  />
</template>
