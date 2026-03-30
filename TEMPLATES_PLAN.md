# Templates Feature Plan

## Goal

Build a browsable, pre-built template library similar to mjml.io/templates.
Users can preview thumbnails, browse by category, and load a template into the editor in one click.

---

## UI Approach

**Tab-based left panel** — convert the existing left panel to support two tabs:

```
LeftPanel
├── Tab: Components  ← existing
└── Tab: Templates   ← new
    ├── Search bar
    ├── Category chips (All, Newsletter, Promotional, Transactional, ...)
    └── Template grid (thumbnail + name)
        └── Click → confirm dialog → load into editor
```

No new modal or toolbar button needed — keeps the UI clean and discoverable.

---

## Data Model

### `src/types/template.types.ts` (new)
```ts
export interface EmailTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  thumbnail: string          // base64 PNG or URL
  tree: EditorNode
  head: HeadSettings
}

export type TemplateCategory =
  | 'All'
  | 'Newsletter'
  | 'Promotional'
  | 'Transactional'
  | 'Welcome'
  | 'Announcement'
  | 'Minimal'
```

### `src/config/templates/` (new directory)
Each template is a separate file for maintainability:
```
src/config/templates/
├── index.ts               ← exports TEMPLATES array
├── newsletter-basic.ts
├── promo-sale.ts
├── transactional-receipt.ts
├── welcome-email.ts
└── ...
```

Each template file exports an `EmailTemplate` object — either as a raw tree/head JSON or as an MJML string parsed at load time via `deserializeFromMjml()`.

---

## Templates to Build (Phase 1 — 8 templates)

| # | Name | Category | Description |
|---|------|----------|-------------|
| 1 | Newsletter Basic | Newsletter | Header logo, hero image, 2 articles, footer |
| 2 | Promo Sale | Promotional | Big banner, discount badge, CTA button, product grid |
| 3 | Welcome Email | Welcome | Greeting, onboarding steps, single CTA |
| 4 | Password Reset | Transactional | Simple centered card, button, security note |
| 5 | Order Confirmation | Transactional | Order details table, items list, total |
| 6 | Event Announcement | Announcement | Date/time hero, speaker cards, RSVP button |
| 7 | Minimal Plain | Minimal | Text-only, no images, clean typography |
| 8 | Product Launch | Promotional | Full-bleed hero, feature grid, pricing CTA |

---

## Architecture

### New Files
| File | Purpose |
|------|---------|
| `src/types/template.types.ts` | Type definitions |
| `src/config/templates/index.ts` | Template registry |
| `src/config/templates/*.ts` | Individual template data |
| `src/components/panels/TemplatesPanel.vue` | Browser UI component |
| `src/composables/useTemplates.ts` | Load/filter/search logic |

### Modified Files
| File | Change |
|------|--------|
| `src/components/editor/LeftPanel.vue` | Add "Templates" tab alongside "Components" |

---

## Component: TemplatesPanel.vue

```
TemplatesPanel
├── Search input
├── Category filter row (chip buttons)
├── Scrollable grid
│   └── TemplateCard
│       ├── Thumbnail (image or rendered preview)
│       ├── Name
│       ├── Category badge
│       └── "Use Template" button on hover
└── Empty state (no matches)
```

### Thumbnail Strategy
Two options (ranked by effort):
1. **Static PNG/WebP** — pre-rendered screenshots embedded as base64 or hosted assets. Fast, no runtime cost.
2. **Live preview** — render MJML to HTML and show in a scaled-down `<iframe>`. Better fidelity, slightly heavier.

**Recommendation: static thumbnails for Phase 1**, live preview as Phase 2.

---

## Loading a Template

```ts
function loadTemplate(template: EmailTemplate) {
  // Warn if current editor has content
  if (editorHasContent()) {
    if (!confirm('This will replace your current email. Continue?')) return
  }

  editorStore.loadTree(cloneDeep(template.tree))  // deep clone so template stays immutable
  headStore.loadSettings(cloneDeep(template.head))
}
```

Use `structuredClone()` or `JSON.parse(JSON.stringify(...))` for deep clone.

---

## Composable: useTemplates.ts

```ts
export function useTemplates() {
  const search = ref('')
  const activeCategory = ref<TemplateCategory>('All')

  const filtered = computed(() =>
    TEMPLATES.filter(t => {
      const matchesSearch = !search.value ||
        t.name.toLowerCase().includes(search.value.toLowerCase())
      const matchesCategory =
        activeCategory.value === 'All' || t.category === activeCategory.value
      return matchesSearch && matchesCategory
    })
  )

  return { search, activeCategory, filtered }
}
```

---

## LeftPanel Tab Changes

```vue
<!-- LeftPanel.vue -->
<div class="flex border-b border-gray-200">
  <button :class="tab === 'components' ? 'active' : ''" @click="tab = 'components'">
    Components
  </button>
  <button :class="tab === 'templates' ? 'active' : ''" @click="tab = 'templates'">
    Templates
  </button>
</div>

<ComponentLibrary v-if="tab === 'components'" />
<TemplatesPanel v-else />
```

---

## Phase 2 Ideas (future)

- **User saved templates** — save current work as a custom template (stored in localStorage or backend)
- **Live iframe thumbnails** — render MJML in a scaled `<iframe>` for real-time previews
- **Template variables** — mark template fields as "fill in" (name, logo, brand color)
- **Duplicate & customize** — "Use as starting point" vs "Replace current"
- **Import from URL** — paste a URL to a .mjml file to load it as a template
- **Community templates** — user-submitted templates from a remote API

---

## Implementation Order

1. `src/types/template.types.ts` — define the type
2. `src/composables/useTemplates.ts` — filter/search logic
3. `src/config/templates/index.ts` + 8 template files — the actual template data (MJML strings → deserialized at startup or lazily)
4. `src/components/panels/TemplatesPanel.vue` — browsing UI
5. `src/components/editor/LeftPanel.vue` — add the tab

Total estimated new files: ~13
Total modified files: 1 (LeftPanel.vue)
