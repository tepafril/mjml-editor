# MJML New Tags — Implementation Plan

> Add all missing MJML tags to the editor, organized by priority.

---

## Overview of Current State

**Implemented:** `mj-body`, `mj-section`, `mj-column`, `mj-text`, `mj-button`, `mj-image`, `mj-divider`, `mj-spacer`, plus pseudo-types `mj-heading` and `mj-avatar`.

**Files that need changes for every new tag:**

| File | What to add |
|------|-------------|
| `src/types/node.types.ts` | Add to `NodeType` union, `LEAF_TYPES`, `ALLOWED_CHILDREN` |
| `src/types/mjml.types.ts` | Add default props in `NODE_DEFAULT_PROPS`, default content in `NODE_DEFAULT_CONTENT` |
| `src/utils/defaultProps.ts` | Handle auto-child creation in `createNode()` (for container types) |
| `src/utils/mjmlSerializer.ts` | Handle pseudo-type mapping (if any) and special serialization (compound tags) |
| `src/utils/mjmlDeserializer.ts` | Handle parsing and pseudo-type inference |
| `src/components/panels/ComponentLibrary.vue` | Add tile entry with icon and group |
| `src/components/panels/PropsPanel.vue` | Add type to relevant `HAS_*` sets, add type-specific controls if needed |
| `src/components/canvas/DragGhost.vue` | Add to `ICON_MAP` and `LABEL_MAP` |
| `src/components/panels/LayerItem.vue` | Add to `ICON_MAP` |

---

## Phase 1 — High-Priority Body Tags

### 1.1 `mj-wrapper`

A full-width section that can wrap multiple `mj-section` children. Unlike `mj-section`, it allows background images that span across nested sections.

**MJML output:**
```html
<mj-wrapper background-color="#f0f0f0" padding="20px 0">
  <mj-section>...</mj-section>
  <mj-section>...</mj-section>
</mj-wrapper>
```

**Changes:**
- **NodeType:** `'mj-wrapper'`
- **ALLOWED_CHILDREN:** `mj-body` → add `'mj-wrapper'`, `mj-wrapper` → `['mj-section']`
- **Default props:** `{ padding: '20px 0', 'background-color': '', 'background-url': '', 'background-repeat': 'repeat', 'background-size': 'auto', 'full-width': 'full-width', 'text-align': 'center' }`
- **createNode:** auto-add one `mj-section` child (like `mj-section` auto-adds a column)
- **Serializer:** direct mapping (no pseudo-type), tag name = `mj-wrapper`
- **Library:** group = Layout, icon = `LayoutTemplate`
- **PropsPanel:** reuse section controls (padding, background-color, background-url)

### 1.2 `mj-hero`

A hero section with a background image and vertically-centered overlay content. Renders as a single container.

**MJML output:**
```html
<mj-hero mode="fixed-height" height="469px" background-height="469px"
         background-url="https://example.com/hero.jpg"
         background-color="#2f2f2f" padding="100px 0px">
  <mj-text>Hero Title</mj-text>
  <mj-button>CTA</mj-button>
</mj-hero>
```

**Note:** `mj-hero` children are direct content elements (`mj-text`, `mj-button`, `mj-image`), NOT `mj-section`/`mj-column`. This is a special case.

**Changes:**
- **NodeType:** `'mj-hero'`
- **ALLOWED_CHILDREN:** `mj-body` → add `'mj-hero'`, `mj-hero` → `['mj-text', 'mj-heading', 'mj-button', 'mj-image']`
- **Default props:** `{ mode: 'fixed-height', height: '400px', 'background-height': '400px', 'background-url': 'https://via.placeholder.com/600x400', 'background-color': '#2f2f2f', 'background-position': 'center center', padding: '100px 0px', 'vertical-align': 'middle', width: '600px' }`
- **createNode:** auto-add one `mj-text` child with "Hero Title"
- **Library:** group = Layout, icon = `RectangleHorizontal`
- **PropsPanel:** new controls for `mode` (dropdown: fixed-height / fluid-height), `background-url`, `background-height`, `background-position`; reuse padding, background-color, vertical-align

### 1.3 `mj-social` / `mj-social-element`

Social media icon row. `mj-social` is a container; each `mj-social-element` is one icon+link.

**MJML output:**
```html
<mj-social font-size="15px" icon-size="30px" mode="horizontal">
  <mj-social-element name="facebook" href="https://facebook.com/profile">Facebook</mj-social-element>
  <mj-social-element name="twitter" href="https://twitter.com/profile">Twitter</mj-social-element>
  <mj-social-element name="instagram" href="https://instagram.com/profile">Instagram</mj-social-element>
</mj-social>
```

**Compound node pattern:** This is the first compound component — a parent + children that are serialized as separate MJML tags. Both need their own `NodeType`.

**Changes:**
- **NodeType:** `'mj-social'`, `'mj-social-element'`
- **ALLOWED_CHILDREN:** `mj-column` → add `'mj-social'`, `mj-social` → `['mj-social-element']`
- **LEAF_TYPES:** add `'mj-social-element'`
- **Default props (mj-social):** `{ 'font-size': '15px', 'icon-size': '30px', mode: 'horizontal', align: 'center', padding: '10px 25px', 'icon-padding': '4px', 'text-padding': '4px 4px 4px 0' }`
- **Default props (mj-social-element):** `{ name: 'facebook', href: '#', 'background-color': '', 'border-radius': '3px', 'icon-size': '' }`
- **NODE_DEFAULT_CONTENT (mj-social-element):** `'Share'`
- **createNode (mj-social):** auto-add 3 children: facebook, twitter, instagram
- **Library:** group = Content, icon = `Share2`. Only `mj-social` appears in library (children auto-created); `mj-social-element` is not directly draggable but can be added via a "+" button in the props panel.
- **PropsPanel (mj-social):** mode dropdown (horizontal/vertical), icon-size, font-size, align
- **PropsPanel (mj-social-element):** `name` dropdown (facebook, twitter, instagram, youtube, linkedin, pinterest, github, etc.), `href`, content text, custom icon-size, background-color
- **Serializer:** straightforward — no pseudo-type mapping needed
- **Deserializer:** add `'mj-social'` and `'mj-social-element'` to `VALID_TYPES`

### 1.4 `mj-navbar` / `mj-navbar-link`

A horizontal navigation bar with clickable links. Similar compound pattern to `mj-social`.

**MJML output:**
```html
<mj-navbar>
  <mj-navbar-link href="/about" color="#ffffff">About</mj-navbar-link>
  <mj-navbar-link href="/pricing" color="#ffffff">Pricing</mj-navbar-link>
  <mj-navbar-link href="/contact" color="#ffffff">Contact</mj-navbar-link>
</mj-navbar>
```

**Changes:**
- **NodeType:** `'mj-navbar'`, `'mj-navbar-link'`
- **ALLOWED_CHILDREN:** `mj-column` → add `'mj-navbar'`, `mj-navbar` → `['mj-navbar-link']`
- **LEAF_TYPES:** add `'mj-navbar-link'`
- **Default props (mj-navbar):** `{ align: 'center', 'ico-open': 'https://i.imgur.com/noMGJ9i.png', 'ico-close': 'https://i.imgur.com/j5v8eEW.png', 'ico-color': '#000000', 'ico-font-size': '30px', 'ico-padding': '10px', hamburger: 'hamburger' }`
- **Default props (mj-navbar-link):** `{ href: '#', color: '#000000', 'font-size': '13px', 'font-family': 'Arial, sans-serif', padding: '10px 15px', 'text-decoration': 'none', 'text-transform': 'uppercase' }`
- **NODE_DEFAULT_CONTENT (mj-navbar-link):** `'Link'`
- **createNode (mj-navbar):** auto-add 3 links (Home, About, Contact)
- **Library:** group = Content, icon = `Navigation`
- **PropsPanel (mj-navbar):** hamburger toggle, align
- **PropsPanel (mj-navbar-link):** href, content, color, font-size, text-transform, padding

---

## Phase 2 — Medium-Priority Body Tags

### 2.1 `mj-group`

Non-responsive column container. Columns inside `mj-group` remain side-by-side on mobile instead of stacking. Placed inside `mj-section` as a sibling/alternative to `mj-column`.

**MJML output:**
```html
<mj-section>
  <mj-group>
    <mj-column>...</mj-column>
    <mj-column>...</mj-column>
  </mj-group>
</mj-section>
```

**Changes:**
- **NodeType:** `'mj-group'`
- **ALLOWED_CHILDREN:** `mj-section` → add `'mj-group'`, `mj-group` → `['mj-column']`
- **Default props:** `{ width: '100%', direction: 'ltr', 'background-color': '', 'vertical-align': 'top' }`
- **createNode:** auto-add 2 `mj-column` children
- **Library:** group = Layout, icon = `Columns3`
- **PropsPanel:** width, direction (ltr/rtl), background-color, vertical-align

### 2.2 `mj-table`

An HTML table rendered inside an MJML email. Content is raw HTML `<tr><td>` markup stored in the `content` field.

**MJML output:**
```html
<mj-table>
  <tr>
    <td>Name</td>
    <td>Email</td>
  </tr>
  <tr>
    <td>John</td>
    <td>john@example.com</td>
  </tr>
</mj-table>
```

**Changes:**
- **NodeType:** `'mj-table'`
- **ALLOWED_CHILDREN:** `mj-column` → add `'mj-table'`
- **LEAF_TYPES:** add `'mj-table'`
- **Default props:** `{ color: '#000000', 'font-size': '13px', 'font-family': 'Arial, sans-serif', padding: '10px 25px', width: '100%', cellpadding: '0', cellspacing: '0' }`
- **NODE_DEFAULT_CONTENT:** `'<tr><td style="padding:4px">Cell 1</td><td style="padding:4px">Cell 2</td></tr><tr><td style="padding:4px">Cell 3</td><td style="padding:4px">Cell 4</td></tr>'`
- **Library:** group = Content, icon = `Table`
- **PropsPanel:** content textarea (raw HTML), color, font-size, font-family, width, padding
- **Serializer:** content is raw HTML inner content (already handled by our serializer)

### 2.3 `mj-raw`

Raw HTML passthrough. Not processed by MJML — injected as-is into the output. Useful for conditional comments (`<!--[if mso]>`) and custom HTML.

**MJML output:**
```html
<mj-raw>
  <!--[if mso]>
  <table><tr><td>Outlook fallback</td></tr></table>
  <![endif]-->
</mj-raw>
```

**Changes:**
- **NodeType:** `'mj-raw'`
- **ALLOWED_CHILDREN:** `mj-column` → add `'mj-raw'`, also `mj-body` → add `'mj-raw'` (mj-raw can be a direct child of mj-body for `<head>`-level injection)
- **LEAF_TYPES:** add `'mj-raw'`
- **Default props:** `{}` (no attributes)
- **NODE_DEFAULT_CONTENT:** `'<!-- Your raw HTML here -->'`
- **Library:** group = Advanced, icon = `Code`
- **PropsPanel:** content textarea only (full-width, monospaced)
- **Serializer:** tag name = `mj-raw`, content = raw inner HTML

---

## Phase 3 — Head Components

Head components don't appear in the canvas — they control metadata. They need a different UX: a settings panel or modal rather than drag-and-drop.

### 3.1 Data Model for Head

Add a new top-level `headSettings` object in the editor store (not part of the EditorNode tree):

```typescript
// types/head.types.ts
export interface HeadSettings {
  title: string                    // mj-title
  previewText: string              // mj-preview
  fonts: GoogleFont[]              // mj-font
  styles: string                   // mj-style (inline CSS)
  breakpoint: string               // mj-breakpoint (e.g., "480px")
}

export interface GoogleFont {
  name: string                     // e.g., "Roboto"
  href: string                     // Google Fonts URL
}
```

### 3.2 `mj-title`

Sets `<title>` in the email HTML. Single string value.

**MJML output:**
```html
<mj-head>
  <mj-title>My Newsletter — March 2026</mj-title>
</mj-head>
```

**Changes:**
- Add `title` field to `HeadSettings`
- **Serializer:** inject `<mj-head><mj-title>...</mj-title></mj-head>` into `buildFullMjml()` before `<mj-body>`
- **UI:** text input in a new "Email Settings" section in the toolbar or right panel

### 3.3 `mj-preview`

Preview text shown in email client inbox list (the snippet after the subject line).

**MJML output:**
```html
<mj-head>
  <mj-preview>Check out our latest updates...</mj-preview>
</mj-head>
```

**Changes:**
- Add `previewText` field to `HeadSettings`
- **Serializer:** inject into `<mj-head>` block
- **UI:** text input in "Email Settings"

### 3.4 `mj-font`

Loads external fonts (typically Google Fonts) for use in text components.

**MJML output:**
```html
<mj-head>
  <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" />
  <mj-font name="Open Sans" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" />
</mj-head>
```

**Changes:**
- Add `fonts: GoogleFont[]` to `HeadSettings`
- **Serializer:** inject one `<mj-font>` per entry into `<mj-head>`
- **UI:** list editor in "Email Settings" — each row has font name + URL. Add/remove buttons. Optionally, a preset dropdown for common Google Fonts (Roboto, Open Sans, Lato, Montserrat, etc.)
- **Side effect:** once a font is added, it becomes available in the font-family dropdown in PropsPanel typography controls

### 3.5 `mj-style`

Custom CSS injected into the email. Used for hover states, custom classes, etc.

**MJML output:**
```html
<mj-head>
  <mj-style>
    .custom-link { color: #4A90D9; text-decoration: underline; }
    .custom-link:hover { color: #2A60A9; }
  </mj-style>
</mj-head>
```

**Changes:**
- Add `styles: string` to `HeadSettings`
- **Serializer:** inject `<mj-style>` into `<mj-head>` if non-empty
- **UI:** code textarea (monospaced) in "Email Settings"

### 3.6 `mj-breakpoint`

Sets the responsive breakpoint width (default is 480px in MJML).

**MJML output:**
```html
<mj-head>
  <mj-breakpoint width="320px" />
</mj-head>
```

**Changes:**
- Add `breakpoint: string` to `HeadSettings`
- **Serializer:** inject if non-empty
- **UI:** unit input in "Email Settings"

### 3.7 `mj-attributes`

Sets global default attributes for MJML components. Affects all instances of a tag unless overridden.

**MJML output:**
```html
<mj-head>
  <mj-attributes>
    <mj-all font-family="Roboto, sans-serif" />
    <mj-text font-size="16px" color="#333333" />
    <mj-button background-color="#E85034" />
  </mj-attributes>
</mj-head>
```

**Changes:**
- Add `globalAttributes: Record<string, Record<string, string>>` to `HeadSettings`, keyed by tag name (`'mj-all'`, `'mj-text'`, etc.)
- **Serializer:** inject into `<mj-head>`
- **UI:** a "Global Styles" panel — one expandable section per component type, each with the same prop controls as PropsPanel. Values set here override defaults for all components of that type.

---

## Phase 4 — Low-Priority / Limited Email Client Support

### 4.1 `mj-carousel` / `mj-carousel-image`

Image carousel with navigation dots. **Limited support** — only works in iOS Mail, Apple Mail, Thunderbird, and some webmail. Falls back to showing just the first image on Outlook/Gmail.

**MJML output:**
```html
<mj-carousel>
  <mj-carousel-image src="https://example.com/img1.jpg" />
  <mj-carousel-image src="https://example.com/img2.jpg" />
  <mj-carousel-image src="https://example.com/img3.jpg" />
</mj-carousel>
```

**Changes:**
- **NodeType:** `'mj-carousel'`, `'mj-carousel-image'`
- **ALLOWED_CHILDREN:** `mj-column` → add `'mj-carousel'`, `mj-carousel` → `['mj-carousel-image']`
- **Default props (mj-carousel):** `{ align: 'center', 'border-radius': '0', 'icon-width': '44px', 'left-icon': '', 'right-icon': '', 'tb-border': '2px solid transparent', 'tb-border-radius': '0', 'tb-hover-border-color': 'inherit', 'tb-selected-border-color': '#ccc', 'tb-width': '' }`
- **Default props (mj-carousel-image):** `{ src: 'https://via.placeholder.com/600x300', alt: '', href: '#', 'thumbnails-src': '', width: '600px' }`
- **createNode:** auto-add 3 carousel images
- **Library:** group = Media, icon = `GalleryHorizontal`
- **PropsPanel (mj-carousel):** icon-width, border-radius, alignment
- **PropsPanel (mj-carousel-image):** src, alt, href, thumbnails-src, width

### 4.2 `mj-accordion` / `mj-accordion-element` / `mj-accordion-title` / `mj-accordion-text`

Expandable/collapsible content sections. **Very limited support** — only works in iOS Mail, Apple Mail, and some webmail. Falls back to all sections expanded.

**MJML output:**
```html
<mj-accordion>
  <mj-accordion-element>
    <mj-accordion-title>Question 1?</mj-accordion-title>
    <mj-accordion-text>Answer 1 text here...</mj-accordion-text>
  </mj-accordion-element>
  <mj-accordion-element>
    <mj-accordion-title>Question 2?</mj-accordion-title>
    <mj-accordion-text>Answer 2 text here...</mj-accordion-text>
  </mj-accordion-element>
</mj-accordion>
```

**This is a 3-level compound component:** accordion → element → title/text. Most complex nesting in MJML.

**Changes:**
- **NodeType:** `'mj-accordion'`, `'mj-accordion-element'`, `'mj-accordion-title'`, `'mj-accordion-text'`
- **ALLOWED_CHILDREN:**
  - `mj-column` → add `'mj-accordion'`
  - `mj-accordion` → `['mj-accordion-element']`
  - `mj-accordion-element` → `['mj-accordion-title', 'mj-accordion-text']`
- **LEAF_TYPES:** add `'mj-accordion-title'`, `'mj-accordion-text'`
- **Default props (mj-accordion):** `{ border: '1px solid #e0e0e0', padding: '10px 25px', 'icon-position': 'right', 'icon-align': 'middle', 'icon-height': '32px', 'icon-width': '32px' }`
- **Default props (mj-accordion-element):** `{ 'background-color': '', 'font-family': 'Arial, sans-serif' }`
- **Default props (mj-accordion-title):** `{ color: '#000000', 'font-size': '16px', 'font-family': 'Arial, sans-serif', padding: '16px', 'background-color': '#f0f0f0' }`
- **Default props (mj-accordion-text):** `{ color: '#333333', 'font-size': '14px', 'font-family': 'Arial, sans-serif', padding: '16px', 'background-color': '#ffffff' }`
- **NODE_DEFAULT_CONTENT:** title = `'Question?'`, text = `'Answer goes here...'`
- **createNode (mj-accordion):** auto-add 2 `mj-accordion-element`, each with title + text children
- **Library:** group = Content, icon = `ListCollapse`

---

## Phase 5 — Serializer & Head Integration

### 5.1 Update `buildFullMjml()` to include `<mj-head>`

Currently `buildFullMjml()` outputs `<mjml><mj-body>...</mj-body></mjml>`. It needs to include the head block:

```typescript
export function buildFullMjml(root: EditorNode, head?: HeadSettings): string {
  const headBlock = serializeHead(head)
  const bodyContent = serializeToMjml(root, 1)
  return `<mjml>\n${headBlock}${bodyContent}\n</mjml>`
}

function serializeHead(head?: HeadSettings): string {
  if (!head) return ''
  const parts: string[] = []

  if (head.title) parts.push(`    <mj-title>${head.title}</mj-title>`)
  if (head.previewText) parts.push(`    <mj-preview>${head.previewText}</mj-preview>`)
  if (head.breakpoint) parts.push(`    <mj-breakpoint width="${head.breakpoint}" />`)

  for (const font of head.fonts) {
    parts.push(`    <mj-font name="${font.name}" href="${font.href}" />`)
  }

  if (head.styles) {
    parts.push(`    <mj-style>\n${head.styles}\n    </mj-style>`)
  }

  // mj-attributes
  const attrEntries = Object.entries(head.globalAttributes || {})
  if (attrEntries.length > 0) {
    const attrs = attrEntries.map(([tag, props]) => {
      const propsStr = Object.entries(props).filter(([,v]) => v).map(([k,v]) => `${k}="${v}"`).join(' ')
      return `      <${tag} ${propsStr} />`
    }).join('\n')
    parts.push(`    <mj-attributes>\n${attrs}\n    </mj-attributes>`)
  }

  if (parts.length === 0) return ''
  return `  <mj-head>\n${parts.join('\n')}\n  </mj-head>\n`
}
```

### 5.2 Email Settings UI

Add an "Email Settings" panel accessible from:
- A gear icon in the Toolbar, OR
- A new tab in the Right Panel (Props / Settings)

The panel contains:
- **Title** — text input
- **Preview Text** — text input
- **Fonts** — list of name + URL rows with add/remove
- **Custom CSS** — code textarea
- **Breakpoint** — unit input (default 480px)
- **Global Attributes** — expandable sections per component type

---

## Implementation Order

| Step | Tags | Scope | Est. effort |
|------|------|-------|-------------|
| 1 | `mj-wrapper` | Types, props, serializer, library, PropsPanel | Small |
| 2 | `mj-hero` | Types, props, serializer, library, PropsPanel | Small |
| 3 | `mj-social` + `mj-social-element` | Compound component, add-child UI | Medium |
| 4 | `mj-navbar` + `mj-navbar-link` | Compound component (same pattern as social) | Medium |
| 5 | `mj-table`, `mj-raw` | Leaf nodes with HTML content | Small |
| 6 | `mj-group` | Container node (same pattern as section) | Small |
| 7 | Head types + `HeadSettings` store | New store, serializer update, settings UI | Medium |
| 8 | `mj-title`, `mj-preview`, `mj-font` | Head settings UI fields | Small |
| 9 | `mj-style`, `mj-breakpoint`, `mj-attributes` | Head settings UI fields | Medium |
| 10 | `mj-carousel` + `mj-carousel-image` | Compound component | Medium |
| 11 | `mj-accordion` (4 sub-types) | Deep compound component | Large |

**Total: 17 new node types across 11 implementation steps.**
