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

  function removeGlobalAttribute(tag: string, prop?: string) {
    if (!prop) {
      delete settings.value.globalAttributes[tag]
    } else {
      delete settings.value.globalAttributes[tag]?.[prop]
      // Clean up empty tag entries
      if (settings.value.globalAttributes[tag] && Object.keys(settings.value.globalAttributes[tag]).length === 0) {
        delete settings.value.globalAttributes[tag]
      }
    }
  }

  // --- HTML Attributes ---
  function addHtmlSelector() {
    settings.value.htmlAttributes.push({ path: '', attributes: {} })
  }

  function removeHtmlSelector(index: number) {
    settings.value.htmlAttributes.splice(index, 1)
  }

  function updateHtmlSelectorPath(index: number, path: string) {
    settings.value.htmlAttributes[index].path = path
  }

  function setHtmlAttribute(index: number, name: string, value: string) {
    settings.value.htmlAttributes[index].attributes[name] = value
  }

  function removeHtmlAttribute(index: number, name: string) {
    delete settings.value.htmlAttributes[index].attributes[name]
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
    updateGlobalAttribute, removeGlobalAttribute,
    addHtmlSelector, removeHtmlSelector, updateHtmlSelectorPath,
    setHtmlAttribute, removeHtmlAttribute,
    loadSettings, reset,
  }
})
