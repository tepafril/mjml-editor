import { useEditorStore } from '@/stores/editor.store'
import { useHeadStore } from '@/stores/head.store'
import { buildFullExportMjml } from '@/utils/mjmlSerializer'
import { deserializeFromMjml } from '@/utils/mjmlDeserializer'
// @ts-expect-error mjml-browser has no types
import mjml2html from 'mjml-browser'

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function useImportExport() {
  const editor = useEditorStore()
  const headStore = useHeadStore()

  function exportJson() {
    const data = { tree: editor.tree, head: headStore.settings }
    const json = JSON.stringify(data, null, 2)
    downloadFile(json, 'template.json', 'application/json')
  }

  function exportMjml() {
    const mjml = buildFullExportMjml(editor.tree, headStore.settings)
    downloadFile(mjml, 'template.mjml', 'text/plain')
  }

  function exportHtml() {
    const mjml = buildFullExportMjml(editor.tree, headStore.settings)
    const { html } = mjml2html(mjml)
    downloadFile(html, 'email.html', 'text/html')
  }

  function triggerFileUpload(accept: string, callback: (file: File) => void) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) callback(file)
    }
    input.click()
  }

  function importJson() {
    triggerFileUpload('.json', (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          if (data.tree) {
            editor.loadTree(data.tree)
          } else {
            // Legacy format: raw tree
            editor.loadTree(data)
          }
          if (data.head) {
            headStore.loadSettings(data.head)
          }
        } catch (err) {
          console.error('Failed to import JSON:', err)
        }
      }
      reader.readAsText(file)
    })
  }

  function importMjml() {
    triggerFileUpload('.mjml,.xml', (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const mjmlString = e.target?.result as string
          const tree = deserializeFromMjml(mjmlString)
          editor.loadTree(tree)
        } catch (err) {
          console.error('Failed to import MJML:', err)
        }
      }
      reader.readAsText(file)
    })
  }

  return { exportJson, exportMjml, exportHtml, importJson, importMjml }
}
