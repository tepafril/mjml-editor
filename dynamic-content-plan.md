# Dynamic CRM Data in Email Template Builder

## Context

This MJML email editor is a CRM tool, so templates need to render personalized data at send time. Currently there is zero support for dynamic content. We need to add template variable constructs and a user-friendly UX for inserting them. This is informed by how major email builders (Mailchimp, SendGrid, HubSpot, ActiveCampaign) handle dynamic CRM data.

---

## 1. What Data Structures to Support

### Priority 1: Merge Variables
- **What**: Simple value substitution — `{{contact.firstName}}`, `{{company.name}}`, `{{unsubscribe_url}}`
- **With fallbacks**: `{{contact.firstName "Customer"}}` — default value when field is empty
- **Where they appear**: Inside text content (mj-text, mj-heading, mj-button) and inside props (href, src)
- **CRM categories**: Contact fields, Company fields, Deal fields, Custom fields, System links (unsubscribe, view-in-browser)

### Priority 2: Conditional Blocks (If/Else)
- **What**: Show/hide entire sections based on contact attributes
- **Syntax**: `{{#if contact.isVip}}...{{/if}}`
- **Use cases**: VIP-only sections, locale-specific content, show upgrade CTA only for free-tier users
- **Operators**: exists, not exists, equals, not equals, contains, greater than, less than

### Priority 3: Loops / Repeaters
- **What**: Iterate over arrays to render repeated content
- **Syntax**: `{{#each order.items}}...{{/each}}`
- **Use cases**: Order line items, product recommendations, event listings
- **Inside loop**: `{{this.productName}}`, `{{this.price}}`, `{{@index}}`

### Priority 4 (Future): Formatting Helpers
- Date formatting: `{{formatDate contact.createdAt "MMM D, YYYY"}}`
- Currency formatting: `{{formatCurrency order.total "USD"}}`

---

## 2. Template Syntax: Handlebars

**Why Handlebars over Liquid/Jinja2:**
- Most widely used in email ecosystem (Mailchimp, SendGrid, Postmark)
- Users already familiar with `{{ }}` pattern
- Excellent JavaScript tooling (runs client-side for preview)
- No conflict with MJML/HTML syntax
- No arbitrary code execution (safe)

---

## 3. UX Design

### 3a. Variable Insertion UX

**In text content (PropsPanel textarea):**
1. Add `{x}` "Insert Variable" button above the content textarea
2. Opens a **searchable dropdown/popover** organized by category (Contact, Company, Deal, System)
3. Selecting a variable inserts `{{contact.firstName}}` at cursor position
4. After insertion, a "Fallback value" input appears where user can set a default

**In props (href, src):**
1. Small `{x}` icon button next to URL/text input fields
2. Same picker, filtered by type (URLs for href, image URLs for src)
3. Supports mixed usage: `https://app.com/profile/{{contact.id}}`

### 3b. Conditional Block UX

1. Select any node (section, column, content) → "Condition" toggle appears in PropsPanel
2. Enabling it shows a condition editor:
   - Field picker (reuses variable picker, filtered to all types)
   - Operator dropdown (exists, equals, not equals, contains, gt, lt)
   - Value input (when operator requires it)
3. Visual indicators:
   - Condition badge on node in layer tree
   - Colored left-border or badge on canvas selection overlay

**V1 simplification**: No explicit "else" block. Users create a second section with the negated condition. This avoids complex paired-node logic.

### 3c. Loop / Repeater UX

1. Select an existing section → "Repeat for each..." toggle in PropsPanel
2. Collection picker dropdown (shows array-type variables like `order.items`, `recommendations`)
3. Children of the section become the repeating template
4. Variable picker context changes inside loops to show `this.fieldName`, `@index`, `@first`, `@last`
5. Visual indicator: repeat icon in layer tree

### 3d. Preview with Sample Data

1. New toggle in toolbar (next to Desktop/Mobile/Source): **"Preview Data"**
2. When ON: all Handlebars expressions resolve against sample data → shows realistic preview
3. When OFF: `{{tags}}` render as literal text (so user sees what's dynamic)
4. "Edit Sample Data" button opens a panel/modal for editing sample values (form-based for basic users, raw JSON for advanced)

---

## 4. Data Model Changes

### New types (`src/types/template.types.ts`)

```typescript
interface TemplateVariableCategory {
  id: string          // "contact", "company", "deal", "system"
  label: string       // "Contact", "Company"
  variables: TemplateVariableDefinition[]
}

interface TemplateVariableDefinition {
  key: string         // "contact.firstName"
  label: string       // "First Name"
  type: 'string' | 'number' | 'date' | 'boolean' | 'url' | 'image_url'
  sampleValue: string // "Jane"
  category: string
}

interface TemplateCondition {
  field: string
  operator: 'exists' | 'not_exists' | 'equals' | 'not_equals' | 'contains' | 'gt' | 'lt'
  value?: string
  showElse?: boolean
}

interface TemplateLoop {
  collectionKey: string   // "order.items"
  itemAlias?: string      // defaults to "this"
  maxItems?: number       // preview limit
}
```

### Extend EditorNode (`src/types/node.types.ts`)

```typescript
// Add optional fields:
templateCondition?: TemplateCondition
templateLoop?: TemplateLoop
```

Variables stay inline in `content` and `props` strings — no node-level storage needed.

### New store (`src/stores/template.store.ts`)

```typescript
{
  variableCategories: TemplateVariableCategory[]
  sampleData: Record<string, any>
  previewWithData: boolean
}
```

---

## 5. MJML Pipeline Integration

### Key Insight
MJML treats `{{contact.firstName}}` as literal text — it passes through `mjml2html()` unchanged. So variables in content/props "just work."

### Challenge
`{{#if}}` and `{{#each}}` blocks wrapping MJML tags break MJML's XML parser.

### Solution: Two approaches depending on context

**For Export (production templates)** — use `mj-raw`:
```xml
<mj-raw>{{#if contact.isVip}}</mj-raw>
<mj-section>...VIP content...</mj-section>
<mj-raw>{{/if}}</mj-raw>
```
This is the standard pattern used by Mailchimp and endorsed by MJML docs.

**For Canvas Preview** — post-process the compiled HTML:
1. Compile MJML to HTML normally (conditions/loops ignored)
2. Find nodes by `css-class="node-{id}"` in the HTML DOM
3. Wrap matching elements in Handlebars block syntax
4. If `previewWithData` is on, run `Handlebars.compile(html)(sampleData)`

---

## 6. Implementation Phases

### Phase 1: Variable Insertion (core feature)
**New files:**
- `src/types/template.types.ts`
- `src/stores/template.store.ts`
- `src/components/panels/VariablePicker.vue`
- `src/utils/templateEngine.ts` (Handlebars setup + helpers)

**Modified files:**
- `src/types/node.types.ts` — extend EditorNode
- `src/components/panels/PropsPanel.vue` — add "Insert Variable" button + picker
- `src/composables/useMjmlCompiler.ts` — add Handlebars resolution step
- Toolbar component — add "Preview Data" toggle

### Phase 2: Conditional Blocks
**New files:**
- `src/components/panels/ConditionEditor.vue`

**Modified files:**
- `src/components/panels/PropsPanel.vue` — add condition section
- `src/utils/mjmlSerializer.ts` — emit `mj-raw` wrappers for export
- `src/utils/mjmlDeserializer.ts` — detect Handlebars in `mj-raw` on import
- `src/components/canvas/SelectionBox.vue` — condition badge
- Layer tree component — condition icon

### Phase 3: Loops / Repeaters
**Modified files:**
- `src/components/panels/PropsPanel.vue` — loop configuration section
- `src/utils/mjmlSerializer.ts` — emit `{{#each}}` wrappers
- `src/stores/template.store.ts` — array-type variable definitions

**New files:**
- `src/components/panels/LoopEditor.vue`

### Phase 4: Sample Data Editor & Polish
**New files:**
- `src/components/panels/SampleDataEditor.vue`

**Modified files:**
- Right panel — add "Data" tab
- Import/export logic — include template metadata + sample data

---

## 7. Known Challenges

1. **MJML attribute escaping**: Handlebars expressions in attributes (e.g., `href="{{link}}"`) may get escaped. Serializer needs to preserve them.
2. **Loop preview with node selection**: Multiple copies of same `node-{id}` in preview mode. Solution: only first instance is interactive.
3. **Deserialization round-trip**: Pairing `mj-raw` opening/closing Handlebars blocks with sibling nodes during import needs careful sequential parsing.

---

## 8. Verification

- Insert a variable in mj-text content → verify it appears in MJML source and survives compilation to HTML
- Toggle "Preview Data" → verify sample data replaces variables in the iframe
- Add a condition to a section → export MJML → verify `mj-raw` wrappers are correct
- Re-import the exported MJML → verify condition metadata is restored
- Add a loop to a section → preview with sample array data → verify repeated rendering
- Test undo/redo with template metadata changes
