# MJML Serialization Engine

> **Status:** Design document — ready to implement
> **Scope:** `src/features/import-export/` — replaces `src/utils/mjmlSerializer.ts` and `src/utils/mjmlDeserializer.ts`

---

## Overview

The engine translates between two representations:

- **EditorNode JSON** — the internal tree format used by the editor store
- **MJML string** — the XML-based markup consumed by `mjml-browser`

Both directions are needed:

| Direction | Entry point | Used by |
|---|---|---|
| JSON → MJML | `serialize(root, head?)` | Canvas preview, MJML export, HTML export |
| MJML → JSON | `deserialize(mjmlString)` | MJML file import, paste, AI template |

---

## Data Shapes

### EditorNode (JSON)

```ts
interface EditorNode {
  id: string                          // nanoid — editor-only, stripped on export
  type: NodeType                      // e.g. "mj-text", "mj-section"
  props: Record<string, string>       // MJML attributes (no defaults, only overrides)
  content?: string                    // innerHTML for leaf nodes (mj-text, mj-button, etc.)
  children: EditorNode[]              // empty array for leaf nodes
  hidden?: boolean                    // editor-only flag — excluded from MJML output
  locked?: boolean                    // editor-only flag — not serialized to MJML
  label?: string                      // editor-only display name — not serialized to MJML
}
```

### HeadSettings (JSON)

```ts
interface HeadSettings {
  title: string
  previewText: string
  breakpoint: string                  // e.g. "480px"
  fonts: { name: string; href: string }[]
  styles: string                      // raw CSS string for <mj-style>
  globalAttributes: Record<string, Record<string, string>>
  // key is tag name (e.g. "mj-text") or "mj-class.{name}"
  htmlAttributes: { path: string; attributes: Record<string, string> }[]
}
```

---

## Pseudo-Types

The editor uses a few node types that do not exist in the MJML spec. They map to standard tags but carry extra semantic meaning for the editor UI.

| Editor type | MJML tag | Round-trip identity signal |
|---|---|---|
| `mj-heading` | `mj-text` | `font-weight="bold"` + `font-size >= 20px` |
| `mj-avatar` | `mj-image` | `border-radius="50%"` |

**Serialization:** always write the mapped MJML tag (`mj-text`, `mj-image`).

**Deserialization:** after parsing a tag, inspect its resolved props and infer whether it should be treated as a pseudo-type. If no signal matches, keep the canonical type.

---

## JSON → MJML (Serialize)

### Algorithm

```
serialize(node, indent):
  if node.hidden → return ""
  tagName = resolveTag(node.type)   // pseudo-type → real MJML tag
  attrs   = buildAttrsString(node.props)

  if preview mode:
    inject css-class="node-{id}" for selection highlighting

  if node has visible children:
    return open-tag + serialize each child + close-tag

  if node is empty container (no children):
    return open-tag + placeholder comment + close-tag

  if node has content (leaf with innerHTML):
    return open-tag + node.content + close-tag

  return self-closing tag
```

### Attribute Serialization Rules

- Emit only props present in `node.props` (no defaults)
- Skip props with empty-string values
- XML-escape attribute values: `&` → `&amp;`, `"` → `&quot;`
- Attribute order: arbitrary (sort alphabetically for stable diffs, optional)

### Head Serialization

Each `HeadSettings` field maps to a distinct `mj-head` child:

| HeadSettings field | MJML output |
|---|---|
| `title` | `<mj-title>…</mj-title>` |
| `previewText` | `<mj-preview>…</mj-preview>` |
| `breakpoint` | `<mj-breakpoint width="…" />` |
| `fonts[]` | `<mj-font name="…" href="…" />` per entry |
| `styles` | `<mj-style>\n…\n</mj-style>` |
| `globalAttributes` | wrapped in `<mj-attributes>` — see below |
| `htmlAttributes` | wrapped in `<mj-html-attributes>` — see below |

**globalAttributes** key conventions:
- Plain tag key (e.g. `"mj-text"`) → `<mj-text prop="val" />`
- `"mj-all"` → `<mj-all prop="val" />`
- `"mj-class.{name}"` → `<mj-class name="{name}" prop="val" />`

Skip any entry where all prop values are empty or the key is `_placeholder`.

### Two Serialization Modes

| Mode | `css-class` injection | Empty container placeholders | Used by |
|---|---|---|---|
| **Preview** | Yes — `css-class="node-{id}"` | Yes | Canvas `<iframe>` |
| **Export** | No | No | File export, HTML export |

Implement as a single `serialize(node, opts)` with an `opts.mode: 'preview' | 'export'` flag rather than two separate functions.

---

## MJML → JSON (Deserialize)

### Algorithm

```
deserialize(mjmlString):
  doc = DOMParser(mjmlString, "text/html")
  // text/html handles HTML entities gracefully (&nbsp; etc.)

  mjBody = doc.querySelector("mj-body")
  if not found → throw "Invalid MJML: no mj-body"

  tree = elementToNode(mjBody)
  head = parseHead(doc)

  return { tree, head }
```

### elementToNode

```
elementToNode(el):
  tagName = el.tagName.toLowerCase()
  if tagName not in VALID_TYPES → return null

  attrs = parseAttributes(el)         // strip css-class, mj-class
  type  = inferPseudoType(tagName, attrs)

  childElements = el.children filtered to VALID_TYPES
  if childElements.length > 0:
    children = childElements.map(elementToNode).filter(not null)
    content  = undefined
  else:
    children = []
    content  = el.innerHTML.trim() || undefined
    // skip "Drop components here" placeholder content (added in preview mode)
    if content matches PLACEHOLDER_PATTERN → content = undefined

  props = merge(NODE_DEFAULT_PROPS[type], attrs)
  // storing defaults means the editor shows values immediately

  return { id: nanoid(), type, props, content, children }
```

### Attribute Parsing Rules

- Skip `css-class` (editor-injected)
- Skip `mj-class` (resolved separately via head)
- All other attributes: include as-is, values remain strings

### Head Parsing

Each `mj-head` child maps back to `HeadSettings`:

| MJML element | HeadSettings field |
|---|---|
| `<mj-title>` | `title` (textContent) |
| `<mj-preview>` | `previewText` (textContent) |
| `<mj-breakpoint width="…">` | `breakpoint` |
| `<mj-font name="…" href="…">` | `fonts[]` push |
| `<mj-style>` | `styles` (textContent) |
| `<mj-attributes> > *` | `globalAttributes` — see below |
| `<mj-html-attributes> > mj-selector` | `htmlAttributes[]` push |

**mj-attributes children:**
- `<mj-class name="…" …>` → key `"mj-class.{name}"`, value = remaining attrs
- anything else → key = tagName, value = all attrs as object

### VALID_TYPES

Only these tags are recognized during deserialization. Everything else is skipped (no error).

```ts
const VALID_TYPES = new Set([
  'mj-body', 'mj-section', 'mj-column', 'mj-wrapper', 'mj-group',
  'mj-hero', 'mj-text', 'mj-button', 'mj-image', 'mj-divider',
  'mj-spacer', 'mj-social', 'mj-social-element', 'mj-navbar',
  'mj-navbar-link', 'mj-table', 'mj-raw',
])
```

---

## Round-Trip Fidelity

A round-trip is `deserialize(serialize(tree, { mode: 'export' }))`.

| Property | Round-trip safe? | Notes |
|---|---|---|
| `type` | Yes (for standard types) | Pseudo-types require matching `inferPseudoType` signals |
| `props` | Yes | Defaults merged on deserialize, stripped on next export only if equals default |
| `content` | Yes | Passed through as raw innerHTML |
| `children` | Yes | Structural fidelity maintained |
| `id` | No — by design | `nanoid()` on each import; ids are editor-session identifiers |
| `hidden` | No — by design | Hidden nodes are excluded from MJML output |
| `locked` / `label` | No — by design | Editor-only metadata, not serialized |

---

## File Location

```
src/features/import-export/
├── serializer.ts          # JSON → MJML
├── deserializer.ts        # MJML → JSON
├── types.ts               # SerializeOptions, ParseResult
└── index.ts               # re-exports: serialize, deserialize
```

**Public API:**

```ts
// serializer.ts
export function serialize(
  root: EditorNode,
  head: HeadSettings | undefined,
  opts: { mode: 'preview' | 'export' }
): string

// deserializer.ts
export function deserialize(
  mjmlString: string
): { tree: EditorNode; head: HeadSettings }
```

---

## Migration from Current Utils

| Old | New |
|---|---|
| `serializeToMjml(node, indent)` | `serialize(root, head, { mode: 'preview' })` |
| `buildExportMjml(node, indent)` | `serialize(root, head, { mode: 'export' })` |
| `buildFullMjml(root, head)` | `serialize(root, head, { mode: 'preview' })` |
| `buildFullExportMjml(root, head)` | `serialize(root, head, { mode: 'export' })` |
| `deserializeFromMjml(mjmlString)` | `deserialize(mjmlString)` |

All callers (`useMjmlCompiler.ts`, `useImportExport.ts`, `templateExporter.ts`) update their imports to `@/features/import-export`.
