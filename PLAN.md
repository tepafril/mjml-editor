# MJML Editor — Font System & mj-attributes Plan

## Context

We've been adding font management, inline text editing, and MJML spec coverage to the editor. The work so far has built out the font pipeline (config, store, UI) and inline editing toolbar. The remaining gap is exposing **mj-attributes** (global component defaults) in the UI — the store/serializer/deserializer already support it but there's no panel for it.

---

## Completed Work

### 1. CssClassInput component
- **File:** `src/components/ui/CssClassInput.vue`
- Reusable text input for `css-class` attribute
- Used in EmailSettingsPanel (mj-body)

### 2. Google Fonts Top 100 config
- **File:** `src/config/googleFonts.ts`
- 111 fonts with categories (sans-serif, serif, display, handwriting, monospace)
- `buildGoogleFontUrl()` helper for CSS2 URLs

### 3. FontFamilySelect (AutoComplete)
- **File:** `src/components/ui/FontFamilySelect.vue`
- PrimeVue AutoComplete with dropdown, reads from `headStore.settings.fonts`
- Settings icon opens Email Settings dialog on Fonts tab via `editorStore.requestOpenSettings('fonts')`

### 4. EmailSettingsPanel font browser
- **File:** `src/components/panels/EmailSettingsPanel.vue`
- `initialTab` prop for deep-linking to specific tab
- Font browser with search + category filter over GOOGLE_FONTS_TOP_100
- Toggle fonts on/off, add custom fonts with name/href

### 5. InlineEditToolbar
- **File:** `src/components/canvas/InlineEditToolbar.vue`
- Bold, italic, underline, subscript, superscript
- Font size (px), color picker, font family select
- Native `<select>` for font family (reads from headStore) — avoids AutoComplete focus issues
- `@mousedown.stop` on select to prevent parent `@mousedown.prevent` from blocking dropdown

### 6. Default Arial font
- **File:** `src/types/mjml.types.ts` — `createDefaultHeadSettings()` now includes `{ name: 'Arial', href: '' }`

---

## Remaining Work: mj-attributes UI

### What exists already
- **Store:** `headStore.updateGlobalAttribute(tag, prop, value)` — `src/stores/head.store.ts:37-42`
- **Type:** `HeadSettings.globalAttributes: Record<string, Record<string, string>>` — `src/types/mjml.types.ts:190`
- **Serializer:** Outputs `<mj-attributes>` block — `src/utils/mjmlSerializer.ts:95-102`
- **Deserializer:** Parses `<mj-attributes>` children — `src/utils/mjmlDeserializer.ts:95-108`

### What's missing
A UI tab in EmailSettingsPanel to let users set global defaults per component tag.

### Implementation plan

**Step 1: Add "Defaults" tab to EmailSettingsPanel**
- File: `src/components/panels/EmailSettingsPanel.vue`
- New tab key: `'defaults'` in the tabs array
- Icon: `Sliders` from lucide-vue-next (or similar)
- Update `TabKey` type to include `'defaults'`

**Step 2: Build the Defaults tab UI**
- Show a list of configurable component tags: `mj-text`, `mj-button`, `mj-section`, `mj-column`, `mj-image`, `mj-divider`, `mj-heading`
- For each tag, show relevant props (font-family, font-size, color, padding, background-color, etc.) based on what that component supports
- Use existing UI components: `ColorPicker`, `UnitInput`, `FontFamilySelect`, `AlignmentToggle`
- Read from / write to `headStore.settings.globalAttributes[tag][prop]`
- Collapsible sections per tag to keep it scannable

**Step 3: Wire up store actions**
- Use existing `headStore.updateGlobalAttribute(tag, prop, value)` — no store changes needed

### Key files to modify
| File | Change |
|------|--------|
| `src/components/panels/EmailSettingsPanel.vue` | Add "Defaults" tab + UI |

### Key files to reference (read-only)
| File | Why |
|------|-----|
| `src/types/mjml.types.ts` | `NODE_DEFAULT_PROPS` — know which props each tag supports |
| `src/stores/head.store.ts` | `updateGlobalAttribute()` action |
| `src/components/panels/PropsPanel.vue` | Reuse same UI patterns for prop inputs |

---

## Verification

1. **Font system**: Add a Google Font via font browser → verify it appears in FontFamilySelect (PropsPanel) and InlineEditToolbar's native select
2. **Inline toolbar font**: Double-click text → select font from toolbar dropdown → verify text changes
3. **mj-attributes** (once built): Set a global default (e.g. mj-text font-family: Roboto) → export MJML → verify `<mj-attributes><mj-text font-family="Roboto" /></mj-attributes>` appears in output
4. **Import round-trip**: Import MJML with `<mj-attributes>` → verify defaults tab shows them → re-export → verify preserved
