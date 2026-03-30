# MJML Editor — 50 Built-in Section Components

## Context

The left panel has three tabs: Elements, Sections, and Saved. The Sections tab currently shows a placeholder. This plan implements 50 pre-built, category-organized MJML section components with iframe preview thumbnails, drag-and-drop support, and click-to-insert — giving users a fast way to compose emails from polished building blocks.

---

## File Structure

### New files to create
| File | Purpose |
|------|---------|
| `src/types/section.types.ts` | `SectionCategory` union + `BuiltinSection` interface |
| `src/config/sections/index.ts` | `BUILTIN_SECTIONS` array + `SECTION_CATEGORIES` |
| `src/config/sections/header.ts` | 8 header sections |
| `src/config/sections/hero.ts` | 7 hero sections |
| `src/config/sections/content.ts` | 10 content sections |
| `src/config/sections/cta.ts` | 7 CTA sections |
| `src/config/sections/footer.ts` | 8 footer sections |
| `src/config/sections/divider.ts` | 5 divider/spacer sections |
| `src/config/sections/feature.ts` | 5 feature/product sections |
| `src/utils/sectionParser.ts` | `parseSectionMjml()` helper |
| `src/composables/useBuiltinSections.ts` | search + filter composable |

### Files to modify
| File | Change |
|------|--------|
| `src/components/panels/SectionsPanel.vue` | Full implementation (replace placeholder) |
| `src/types/drag.types.ts` | Add `builtinSectionId?: string` to `DragSource` |
| `src/components/editor/Canvas.vue` | Handle `builtinSectionId` in 3 drop handlers |
| `src/components/canvas/DragGhost.vue` | Show section name for `builtinSectionId` |

---

## Step 1 — Types

**`src/types/section.types.ts`**
```ts
export type SectionCategory =
  | 'Header' | 'Hero' | 'Content' | 'CTA'
  | 'Footer' | 'Divider' | 'Feature'

export interface BuiltinSection {
  id: string
  name: string
  category: SectionCategory
  mjml: string  // bare <mj-section>...</mj-section> snippet (no <mjml> wrapper)
}
```

**`src/types/drag.types.ts`** — add one field:
```ts
export interface DragSource {
  nodeId?: string
  nodeType?: NodeType
  savedSectionId?: string
  builtinSectionId?: string  // ← add
}
```

---

## Step 2 — Section Config Files

Each file exports a typed `BuiltinSection[]`. All MJML snippets are bare `<mj-section>` tags (no `<mjml>` or `<mj-body>` wrapper). The wrapper is added by `parseSectionMjml` at insertion time.

**Brand style guide for all snippets:**
- Primary: `#4f46e5`, dark: `#1f2937`, light bg: `#f9fafb`
- No custom fonts (avoid `mj-font` dependencies in snippets)
- Buttons: `border-radius="6px"`, href="#"
- Images: `https://placehold.co/600x300/e2e8f0/94a3b8?text=Image` (matching existing templates)

### Category breakdown (50 total):

**Header (8):** logo-center, logo-nav, dark, gradient, logo-tagline, minimal, announcement-bar, with-cta

**Hero (7):** centered, dark, image-overlay, split, minimal, gradient, with-stats

**Content (10):** two-column, three-column, single-article, image-left, image-right, quote, stats, list, steps, highlight-box

**CTA (7):** simple, with-text, two-buttons, dark, banner, urgency, newsletter-signup

**Footer (8):** minimal, social, full, dark, columns, links, address, legal

**Divider (5):** simple, bold, with-text, dots, spacer-large

**Feature (5):** icon-grid, highlight, product-showcase, pricing-single, testimonial

**`src/config/sections/index.ts`**
```ts
import { HEADER_SECTIONS } from './header'
import { HERO_SECTIONS } from './hero'
// ... all imports
export const BUILTIN_SECTIONS: BuiltinSection[] = [
  ...HEADER_SECTIONS, ...HERO_SECTIONS, ...CONTENT_SECTIONS,
  ...CTA_SECTIONS, ...FOOTER_SECTIONS, ...DIVIDER_SECTIONS, ...FEATURE_SECTIONS,
]
export const SECTION_CATEGORIES: Array<SectionCategory | 'All'> = [
  'All', 'Header', 'Hero', 'Content', 'CTA', 'Footer', 'Divider', 'Feature',
]
```

---

## Step 3 — sectionParser Utility

**`src/utils/sectionParser.ts`**
```ts
import { nanoid } from 'nanoid'
import type { EditorNode } from '@/types/node.types'
import { deserializeFromMjml } from './mjmlDeserializer'

function cloneWithNewIds(node: EditorNode): EditorNode {
  return { ...node, id: nanoid(), children: node.children.map(cloneWithNewIds) }
}

export function parseSectionMjml(sectionMjml: string): EditorNode {
  const fullMjml = `<mjml><mj-body>${sectionMjml}</mj-body></mjml>`
  const { tree } = deserializeFromMjml(fullMjml)
  // tree = mj-body node; tree.children[0] = the section
  const section = tree.children[0]
  if (!section) throw new Error('parseSectionMjml: no section in snippet')
  return cloneWithNewIds(section)
}
```

Reuses the existing `deserializeFromMjml` from `src/utils/mjmlDeserializer.ts`. The `cloneWithNewIds` pattern mirrors `useSavedSections.ts`.

---

## Step 4 — useBuiltinSections Composable

**`src/composables/useBuiltinSections.ts`** — mirrors `useTemplates.ts`:
```ts
import { ref, computed } from 'vue'
import { BUILTIN_SECTIONS, SECTION_CATEGORIES } from '@/config/sections/index'
import type { SectionCategory } from '@/types/section.types'

export function useBuiltinSections() {
  const search = ref('')
  const activeCategory = ref<SectionCategory | 'All'>('All')
  const filtered = computed(() =>
    BUILTIN_SECTIONS.filter(s =>
      (activeCategory.value === 'All' || s.category === activeCategory.value) &&
      (!search.value || s.name.toLowerCase().includes(search.value.toLowerCase()))
    )
  )
  return { search, activeCategory, filtered, SECTION_CATEGORIES }
}
```

---

## Step 5 — SectionsPanel.vue (full replacement)

**Preview rendering** (same pattern as `TemplatesPanel.vue`):
```ts
// @ts-expect-error mjml-browser has no types
import mjml2html from 'mjml-browser'

function renderPreview(sectionMjml: string): string {
  try {
    const { html } = mjml2html(
      `<mjml><mj-body>${sectionMjml}</mj-body></mjml>`,
      { validationLevel: 'skip' }
    )
    return html
  } catch { return '' }
}

const previews = computed(() =>
  Object.fromEntries(filtered.value.map(s => [s.id, renderPreview(s.mjml)]))
)
```

**Insertion:**
```ts
import { parseSectionMjml } from '@/utils/sectionParser'
import { BUILTIN_SECTIONS } from '@/config/sections/index'

function insertSection(id: string) {
  const section = BUILTIN_SECTIONS.find(s => s.id === id)
  if (!section) return
  const node = parseSectionMjml(section.mjml)
  editorStore.insertNode(node, editorStore.tree.id, editorStore.tree.children.length)
  editorStore.selectNode(node.id)
}
```

**Drag start:**
```ts
onDragStart(event, { builtinSectionId: section.id })
```

**Card layout** (narrow 240px panel — single column):
```
Search bar (compact, full width)
Category chips (flex-wrap: 'All', 'Header', 'Hero', ...)
Card list (space-y-2, p-3)
  Card:
    Thumbnail (height: 120px, overflow-hidden, relative)
      iframe: width:600px; height:900px; transform:scale(0.33);
              transform-origin:top center; left:50%; margin-left:-300px;
      Hover overlay: "Insert" button (indigo, centered)
    Footer: section name (xs font-semibold) + category badge (10px)
```

Scale(0.33) × 600px = 198px displayed width — fits inside ~216px card area.

---

## Step 6 — Canvas.vue (3 insertion points)

**Add imports:**
```ts
import { parseSectionMjml } from '@/utils/sectionParser'
import { BUILTIN_SECTIONS } from '@/config/sections/index'
```

**`resolveDropTarget`** — add after `savedSectionId` branch:
```ts
} else if (source.builtinSectionId) {
  draggedType = 'mj-section'  // all builtin sections are mj-section
}
```

**`handleOverlayDrop`** inside `resolvedDropParentId` block — add after `savedSectionId` branch:
```ts
} else if (source.builtinSectionId) {
  const builtin = BUILTIN_SECTIONS.find(s => s.id === source.builtinSectionId)
  if (builtin) {
    const newNode = parseSectionMjml(builtin.mjml)
    editorStore.insertNode(newNode, resolvedDropParentId.value, resolvedDropIndex.value)
    editorStore.selectNode(newNode.id)
  }
}
```

**`handleOverlayDrop`** fallback block (no resolved parent) and **`onPointerDragEnd`** — same pattern, using `editorStore.tree.children.length` as index for fallback.

---

## Step 7 — DragGhost.vue

**Add import:** `import { BUILTIN_SECTIONS } from '@/config/sections/index'`

**In `resolvedType` computed** — add:
```ts
if (source.builtinSectionId) return 'mj-section'
```

**In `label` computed** — add before type fallback:
```ts
if (source?.builtinSectionId) {
  return BUILTIN_SECTIONS.find(s => s.id === source.builtinSectionId)?.name ?? 'Section'
}
```

---

## Verification

1. Open Sections tab → verify 50 cards render with category chips and search
2. Click category chip → verify cards filter correctly
3. Click "Insert" on a card → section appears at bottom of canvas, is selected
4. Drag a card to canvas → drop indicator shows during drag, section inserts at correct position
5. Drag ghost shows section name (not just "section")
6. Section inserted into editor is editable (props panel works, can move/delete)
7. Export MJML → inserted section appears with correct structure
