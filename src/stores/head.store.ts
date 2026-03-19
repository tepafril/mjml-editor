import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HeadSettings, GoogleFont } from '@/types/mjml.types'
import { createDefaultHeadSettings } from '@/types/mjml.types'

export const useHeadStore = defineStore('head', () => {
  const settings = ref<HeadSettings>(createDefaultHeadSettings())

  function updateTitle(title: string) {
    settings.value.title = title
  }

  function updatePreviewText(text: string) {
    settings.value.previewText = text
  }

  function updateBreakpoint(bp: string) {
    settings.value.breakpoint = bp
  }

  function updateStyles(css: string) {
    settings.value.styles = css
  }

  function addFont(font: GoogleFont) {
    settings.value.fonts.push(font)
  }

  function removeFont(index: number) {
    settings.value.fonts.splice(index, 1)
  }

  function updateFont(index: number, font: GoogleFont) {
    settings.value.fonts[index] = font
  }

  function updateGlobalAttribute(tag: string, prop: string, value: string) {
    if (!settings.value.globalAttributes[tag]) {
      settings.value.globalAttributes[tag] = {}
    }
    settings.value.globalAttributes[tag][prop] = value
  }

  function loadSettings(newSettings: HeadSettings) {
    settings.value = newSettings
  }

  function reset() {
    settings.value = createDefaultHeadSettings()
  }

  return {
    settings,
    updateTitle, updatePreviewText, updateBreakpoint, updateStyles,
    addFont, removeFont, updateFont,
    updateGlobalAttribute, loadSettings, reset,
  }
})
