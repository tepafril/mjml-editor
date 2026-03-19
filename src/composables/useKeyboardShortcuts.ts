import { onMounted, onUnmounted } from 'vue'
import { useEditorStore } from '@/stores/editor.store'

export function useKeyboardShortcuts() {
  const editor = useEditorStore()

  function handleKey(e: KeyboardEvent) {
    const meta = e.metaKey || e.ctrlKey
    const shift = e.shiftKey
    const key = e.key.toLowerCase()

    // Don't intercept when typing in inputs
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return
    }

    if (meta && shift && key === 'z') {
      e.preventDefault()
      editor.redo()
      return
    }

    if (meta && key === 'z') {
      e.preventDefault()
      editor.undo()
      return
    }

    if (meta && key === 'd') {
      e.preventDefault()
      if (editor.selectedId) editor.duplicateNode(editor.selectedId)
      return
    }

    if (key === 'delete' || key === 'backspace') {
      if (editor.selectedId) {
        e.preventDefault()
        editor.removeNode(editor.selectedId)
      }
      return
    }

    if (key === 'escape') {
      editor.selectNode(null)
      return
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKey))
  onUnmounted(() => window.removeEventListener('keydown', handleKey))
}
