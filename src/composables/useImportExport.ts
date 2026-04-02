import { useEditor } from '@/composables/useEditor'
import { serialize, deserialize } from '@/features/import-export'
import { buildTemplateHtml } from '@/utils/templateExporter'
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
  const editor = useEditor()

  function exportJson() {
    const data = { tree: editor.tree, head: editor.head.settings }
    downloadFile(JSON.stringify(data, null, 2), 'template.json', 'application/json')
  }

  function exportMjml() {
    const mjml = serialize(editor.tree, editor.head.settings, { mode: 'export' })
    downloadFile(mjml, 'template.mjml', 'text/plain')
  }

  function exportHtml() {
    const mjml = serialize(editor.tree, editor.head.settings, { mode: 'export' })
    const { html } = mjml2html(mjml)
    downloadFile(html, 'email.html', 'text/html')
  }

  function exportTemplateHtml() {
    const html = buildTemplateHtml(editor.tree, editor.head.settings)
    downloadFile(html, 'template.html', 'text/html')
  }

  function triggerFileUpload(accept: string, callback: (file: File) => void) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.onchange = () => { if (input.files?.[0]) callback(input.files[0]) }
    input.click()
  }

  function importJson() {
    triggerFileUpload('.json', (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          const tree = data.tree ?? data
          editor.loadTree(tree, data.head)
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
          const { tree, head } = deserialize(e.target?.result as string)
          editor.loadTree(tree, head)
        } catch (err) {
          console.error('Failed to import MJML:', err)
        }
      }
      reader.readAsText(file)
    })
  }

  return { exportJson, exportMjml, exportHtml, exportTemplateHtml, importJson, importMjml }
}
