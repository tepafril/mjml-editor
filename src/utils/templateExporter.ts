import type { EditorNode } from '@/types/node.types'
import type { HeadSettings } from '@/types/mjml.types'
import { buildFullMjml } from './mjmlSerializer'
import { flatten } from './treeUtils'
// @ts-expect-error mjml-browser has no types
import mjml2html from 'mjml-browser'

export function buildTemplateHtml(root: EditorNode, head?: HeadSettings): string {
  // Step 1: Build MJML with css-class="node-{id}" markers
  const mjml = buildFullMjml(root, head)

  // Step 2: Compile MJML to HTML
  const { html } = mjml2html(mjml)

  // Step 3: Parse HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Step 4: Inject template logic attributes using node-id anchors
  const allNodes = flatten(root)
  for (const node of allNodes) {
    if (!node.templateLogic) continue
    const el = doc.querySelector(`.node-${node.id}`)
    if (!el) continue

    if (node.templateLogic.foreach) {
      el.setAttribute('foreach', node.templateLogic.foreach)
      if (node.templateLogic.foreachAs) {
        el.setAttribute('foreach-as', node.templateLogic.foreachAs)
      }
    }
    if (node.templateLogic.if) {
      el.setAttribute('if', node.templateLogic.if)
    }
  }

  // Step 5: Strip node-* CSS classes
  const marked = doc.querySelectorAll('[class*="node-"]')
  for (const el of marked) {
    el.className = el.className.replace(/\bnode-\S+/g, '').trim()
    if (!el.className) el.removeAttribute('class')
  }

  // Step 6: Return cleaned HTML
  return '<!doctype html>\n' + doc.documentElement.outerHTML
}
