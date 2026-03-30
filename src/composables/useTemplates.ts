import { ref, computed } from 'vue'
import { useEditorStore } from '@/stores/editor.store'
import { useHeadStore } from '@/stores/head.store'
import { deserializeFromMjml } from '@/utils/mjmlDeserializer'
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/config/templates/index'
import type { TemplateCategory } from '@/types/template.types'

export function useTemplates() {
  const editorStore = useEditorStore()
  const headStore = useHeadStore()

  const search = ref('')
  const activeCategory = ref<TemplateCategory | 'All'>('All')

  const filtered = computed(() =>
    TEMPLATES.filter(t => {
      const matchesSearch = !search.value ||
        t.name.toLowerCase().includes(search.value.toLowerCase()) ||
        t.description.toLowerCase().includes(search.value.toLowerCase())
      const matchesCategory = activeCategory.value === 'All' || t.category === activeCategory.value
      return matchesSearch && matchesCategory
    })
  )

  function loadTemplate(mjml: string) {
    const { tree, head } = deserializeFromMjml(mjml)
    editorStore.loadTree(tree)
    headStore.loadSettings(head)
  }

  return { search, activeCategory, filtered, loadTemplate, TEMPLATE_CATEGORIES }
}
