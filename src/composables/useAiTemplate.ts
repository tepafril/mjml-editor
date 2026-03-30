import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_QWEN_API_KEY as string
const API_BASE = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'
const MODEL = 'qwen-plus'

const SYSTEM_PROMPT = `You are an expert email template designer. When given a description, generate a complete, valid MJML email template.

CRITICAL — Tag naming rules (the prefix is "mj-", NOT "mjml-"):
- Correct: <mj-body>, <mj-section>, <mj-column>, <mj-text>, <mj-button>, <mj-image>, <mj-divider>, <mj-spacer>, <mj-head>, <mj-title>, <mj-preview>
- WRONG: <mjml-body>, <mjml-section>, <mjml-column>, <mjml-text> — NEVER use "mjml-" prefix

Output rules:
- Output ONLY the raw MJML markup, starting with <mjml> and ending with </mjml>
- Always wrap all <mj-section> elements inside a single <mj-wrapper> within <mj-body>
- Use inline styles and MJML attributes for styling (padding, font-size, color, background-color, border-radius, etc.)
- Use professional, modern design with good typography and spacing
- Include realistic placeholder content matching the description
- Do not include any explanation, markdown fences, or text outside the MJML tags`

export function useAiTemplate() {
  const prompt = ref('')
  const isGenerating = ref(false)
  const generatedMjml = ref<string | null>(null)
  const error = ref<string | null>(null)

  async function generate() {
    if (!prompt.value.trim()) return

    isGenerating.value = true
    error.value = null
    generatedMjml.value = null

    try {
      const res = await fetch(`${API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt.value.trim() },
          ],
          temperature: 0.7,
          max_tokens: 4096,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error?.message ?? `API error ${res.status}`)
      }

      const data = await res.json()
      const content: string = data.choices?.[0]?.message?.content ?? ''

      // Extract MJML block in case model wraps in markdown
      const match = content.match(/<mjml[\s\S]*<\/mjml>/i)
      const raw = match ? match[0] : content.trim()
      // Normalize "mjml-" prefix → "mj-" in case the model uses the wrong prefix
      generatedMjml.value = raw.replace(/<(\/?)mjml-/g, '<$1mj-')
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isGenerating.value = false
    }
  }

  function reset() {
    generatedMjml.value = null
    error.value = null
    prompt.value = ''
  }

  return {
    prompt,
    isGenerating,
    generatedMjml,
    error,
    generate,
    reset,
  }
}
