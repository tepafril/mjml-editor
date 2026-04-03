<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { Bold, Italic, Underline, Subscript, Superscript, Palette } from 'lucide-vue-next'
const props = defineProps<{
  iframeDoc: Document | null
  editingNodeId: string | null
}>()

const emit = defineEmits<{
  'update:active': [value: boolean]
}>()

const toolbarRef = ref<HTMLElement>()
const isInteracting = ref(false)


function onToolbarFocusIn() {
  isInteracting.value = true
  emit('update:active', true)
}

function onToolbarFocusOut(e: FocusEvent) {
  // Check if focus moved to another element inside the toolbar
  const related = e.relatedTarget as HTMLElement | null
  if (toolbarRef.value?.contains(related)) return
  isInteracting.value = false
  emit('update:active', false)
  // Refocus the contenteditable so editing continues
  const el = props.iframeDoc?.querySelector(`[contenteditable="true"]`) as HTMLElement
  el?.focus()
}
const visible = ref(false)
const top = ref(0)
const left = ref(0)

const currentFontSize = ref('14')
const currentColor = ref('#000000')
const currentFontFamily = ref('')
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)
const isSubscript = ref(false)
const isSuperscript = ref(false)

function getIframeOffset(): { top: number; left: number } {
  const iframe = props.iframeDoc?.defaultView?.frameElement as HTMLIFrameElement | null
  if (!iframe) return { top: 0, left: 0 }
  const rect = iframe.getBoundingClientRect()
  return { top: rect.top, left: rect.left }
}

function positionToolbar() {
  if (!props.iframeDoc || !props.editingNodeId) {
    visible.value = false
    return
  }

  const el = props.iframeDoc.querySelector(`[contenteditable="true"]`) as HTMLElement
  if (!el) {
    visible.value = false
    return
  }

  const rect = el.getBoundingClientRect()
  const iframeOffset = getIframeOffset()

  top.value = iframeOffset.top + rect.top + 32
  left.value = iframeOffset.left + rect.left

  // Clamp to not go off-screen above
  if (top.value < 4) {
    top.value = iframeOffset.top + rect.bottom + 4
  }

  visible.value = true
  readCurrentStyles()
}

function resolveComputedFontSize(): string {
  if (!props.iframeDoc) return ''
  const sel = props.iframeDoc.getSelection()
  if (!sel || sel.rangeCount === 0) return ''
  const node = sel.focusNode
  if (!node) return ''
  const el = node.nodeType === Node.ELEMENT_NODE ? node as HTMLElement : node.parentElement
  if (!el) return ''
  const computed = props.iframeDoc.defaultView?.getComputedStyle(el)
  return computed?.fontSize || ''
}

function readCurrentStyles() {
  if (!props.iframeDoc) return
  const color = props.iframeDoc.queryCommandValue('foreColor')
  const fontName = props.iframeDoc.queryCommandValue('fontName')

  // queryCommandValue('fontSize') returns legacy 1-7 values, so read computed style instead
  const computedSize = resolveComputedFontSize()
  if (computedSize) {
    // Round to nearest integer px
    const px = Math.round(parseFloat(computedSize))
    if (!isNaN(px)) currentFontSize.value = px + 'px'
  }
  if (color) currentColor.value = rgbToHex(color)
  if (fontName) {
    const name = fontName.replace(/['"]/g, '').split(',')[0].trim()
    currentFontFamily.value = name
  }

  // Read toggle states
  isBold.value = props.iframeDoc.queryCommandState('bold')
  isItalic.value = props.iframeDoc.queryCommandState('italic')
  isUnderline.value = props.iframeDoc.queryCommandState('underline')
  isSubscript.value = props.iframeDoc.queryCommandState('subscript')
  isSuperscript.value = props.iframeDoc.queryCommandState('superscript')
}

function rgbToHex(rgb: string): string {
  if (rgb.startsWith('#')) return rgb
  const match = rgb.match(/\d+/g)
  if (!match || match.length < 3) return rgb
  const [r, g, b] = match.map(Number)
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
}

function execCommand(command: string, value?: string) {
  if (!props.iframeDoc) return
  props.iframeDoc.execCommand(command, false, value)
  // Refocus the editing element
  const el = props.iframeDoc.querySelector(`[contenteditable="true"]`) as HTMLElement
  el?.focus()
}

function toggleBold() { execCommand('bold') }
function toggleItalic() { execCommand('italic') }
function toggleUnderline() { execCommand('underline') }
function toggleSubscript() { execCommand('subscript') }
function toggleSuperscript() { execCommand('superscript') }

function onFontSizeChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value
  currentFontSize.value = val
  // execCommand fontSize only supports 1-7, so we use CSS instead
  if (!props.iframeDoc) return
  const sel = props.iframeDoc.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  if (range.collapsed) return

  const span = props.iframeDoc.createElement('span')
  span.style.fontSize = val
  range.surroundContents(span)
  sel.removeAllRanges()
  sel.addRange(range)
}

function onColorChange(e: Event) {
  const val = (e.target as HTMLInputElement).value
  currentColor.value = val
  execCommand('foreColor', val)
}


watch(() => props.editingNodeId, (id) => {
  if (id) {
    // Wait for contenteditable to be set up
    setTimeout(positionToolbar, 100)
  } else {
    visible.value = false
  }
})

// Reposition on scroll + re-read styles on selection change
let scrollCleanup: (() => void) | null = null
let selectionCleanup: (() => void) | null = null

watch(visible, (v) => {
  if (v && props.iframeDoc) {
    // Scroll listener
    if (props.iframeDoc.defaultView) {
      const onScroll = () => positionToolbar()
      props.iframeDoc.defaultView.addEventListener('scroll', onScroll)
      scrollCleanup = () => props.iframeDoc?.defaultView?.removeEventListener('scroll', onScroll)
    }
    // Selection change listener — re-read formatting at cursor
    const onSelectionChange = () => readCurrentStyles()
    props.iframeDoc.addEventListener('selectionchange', onSelectionChange)
    selectionCleanup = () => props.iframeDoc?.removeEventListener('selectionchange', onSelectionChange)
  } else {
    scrollCleanup?.()
    scrollCleanup = null
    selectionCleanup?.()
    selectionCleanup = null
  }
})

onUnmounted(() => {
  scrollCleanup?.()
  selectionCleanup?.()
})
</script>

<template>
  <div
    v-show="visible"
    ref="toolbarRef"
    class="fixed z-50 flex items-center gap-0.5 px-1.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg"
    :style="{ top: top + 'px', left: left + 'px' }"
    @mousedown.prevent
    @focusin="onToolbarFocusIn"
    @focusout="onToolbarFocusOut"
  >
    <!-- Bold -->
    <button @click="toggleBold" class="p-1.5 rounded transition-colors" :class="isBold ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'" title="Bold">
      <Bold class="w-3.5 h-3.5" />
    </button>

    <!-- Italic -->
    <button @click="toggleItalic" class="p-1.5 rounded transition-colors" :class="isItalic ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'" title="Italic">
      <Italic class="w-3.5 h-3.5" />
    </button>

    <!-- Underline -->
    <button @click="toggleUnderline" class="p-1.5 rounded transition-colors" :class="isUnderline ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'" title="Underline">
      <Underline class="w-3.5 h-3.5" />
    </button>

    <div class="w-px h-4 bg-gray-200 mx-0.5" />

    <!-- Subscript -->
    <button @click="toggleSubscript" class="p-1.5 rounded transition-colors" :class="isSubscript ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'" title="Subscript">
      <Subscript class="w-3.5 h-3.5" />
    </button>

    <!-- Superscript -->
    <button @click="toggleSuperscript" class="p-1.5 rounded transition-colors" :class="isSuperscript ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'" title="Superscript">
      <Superscript class="w-3.5 h-3.5" />
    </button>

    <div class="w-px h-4 bg-gray-200 mx-0.5" />

    <!-- Font Size -->
    <select
      :value="currentFontSize"
      @change="onFontSizeChange"
      @mousedown.stop
      class="w-14 px-1 py-1 text-[10px] text-center border border-gray-200 rounded bg-white
             focus:outline-none focus:border-indigo-400"
      title="Font size (px)"
    >
      <option v-for="size in ['12px','14px','16px','18px','24px','32px','64px','72px']" :key="size" :value="size">
        {{ size }}
      </option>
    </select>

    <!-- Color -->
    <label class="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer" title="Text color">
      <Palette class="w-3.5 h-3.5" :style="{ color: currentColor }" />
      <input
        type="color"
        :value="currentColor"
        @input="onColorChange"
        class="sr-only"
      />
    </label>

    <div class="w-px h-4 bg-gray-200 mx-0.5" />

    <!-- Font Family -->
    <!-- <select
      :value="currentFontFamily"
      @change="onFontFamilyChange"
      @mousedown.stop
      class="w-28 px-1.5 py-1 text-[10px] border border-gray-200 rounded bg-white
             focus:outline-none focus:border-indigo-400"
      title="Font family"
    >
      <option value="" disabled>Font…</option>
      <option v-for="font in fontOptions" :key="font" :value="font">
        {{ font }}
      </option>
    </select> -->
  </div>
</template>
