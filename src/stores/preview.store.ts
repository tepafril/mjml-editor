import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type PreviewMode = 'desktop' | 'mobile' | 'mjml-source' | 'html-source'

export const usePreviewStore = defineStore('preview', () => {
  const mode = ref<PreviewMode>('desktop')

  const showGridLines = ref(false)

  const canvasWidth = computed(() => ({
    'desktop': '100%',
    'mobile': '375px',
    'mjml-source': '100%',
    'html-source': '100%',
  }[mode.value]))

  return { mode, canvasWidth, showGridLines }
})
