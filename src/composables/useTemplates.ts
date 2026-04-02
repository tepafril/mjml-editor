import { ref, computed } from 'vue'
import { useEditor } from '@/composables/useEditor'
import { deserialize } from '@/features/import-export'
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/config/templates/index'
import type { TemplateCategory } from '@/types/template.types'

export function useTemplates() {
  const editor = useEditor()

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
    const { tree, head } = deserialize(mjml)
    editor.loadTree(tree, head)
  }

  return { search, activeCategory, filtered, loadTemplate, TEMPLATE_CATEGORIES }
}
