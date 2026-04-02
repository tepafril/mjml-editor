import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import { useHeadStore } from '@/stores/head.store'
import { buildFullMjml } from '@/utils/mjmlSerializer'

// @ts-expect-error mjml-browser has no types
import mjml2html from 'mjml-browser'

export const useCompilationStore = defineStore('compilation', () => {
  const editorStore = useEditorStore()
  const headStore = useHeadStore()

  const compiledHtml = ref('')
  const compileError = ref<string | null>(null)
  const paused = ref(false)
  let pendingCompile = false
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function compile() {
    try {
      const mjmlString = buildFullMjml(editorStore.tree, headStore.settings)
      const result = mjml2html(mjmlString, { validationLevel: 'soft' })
      compiledHtml.value = result.html
      compileError.value = null
    } catch (e) {
      compileError.value = (e as Error).message
      compiledHtml.value = `<html><body><p style="color:red;padding:20px;">Render error: ${(e as Error).message}</p></body></html>`
    }
  }

  function pause() { paused.value = true }

  function resume() {
    paused.value = false
    if (pendingCompile) {
      pendingCompile = false
      compile()
    }
  }

  watch(
    [() => JSON.stringify(editorStore.tree), () => JSON.stringify(headStore.settings)],
    () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      if (paused.value) { pendingCompile = true; return }
      debounceTimer = setTimeout(compile, 150)
    },
    { immediate: true },
  )

  const mjmlSource = computed(() => buildFullMjml(editorStore.tree, headStore.settings))

  return { compiledHtml, compileError, mjmlSource, pause, resume }
})
