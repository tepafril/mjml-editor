# Inline Canvas Editing

## Context

Users needed the ability to edit text content directly inside the canvas preview (iframe) instead of only through the right-panel textarea. This provides a more intuitive WYSIWYG experience — double-click any text element to edit it in place.

---

## Supported Components

| Component | Editable Element | Notes |
|-----------|-----------------|-------|
| `mj-text` | `<div>` inside `<td>` | Main text block |
| `mj-heading` | `<div>` inside `<td>` | Maps to `mj-text` in MJML |
| `mj-button` | `<a>` tag | Button label text |
| `mj-table` | `<table>` element | Raw HTML table content |
| `mj-social-element` | `<a>` or last `<td>` | Social link label (e.g., "Facebook") |
| `mj-navbar-link` | `<a>` tag | Navigation link text |
| `mj-accordion-title` | `<div>` inside `<td>` | Accordion header |
| `mj-accordion-text` | `<div>` inside `<td>` | Accordion body |

---

## How It Works

### User Flow

1. **Click** a node → selects it (unchanged behavior)
2. **Double-click** a supported text node → enters inline edit mode
3. User types freely in the canvas — cursor, selection, and formatting all work
4. **Escape** or **click outside** → exits edit mode, content is saved

### Architecture: Pause/Resume Compilation

The key challenge: the iframe is fully re-rendered via `doc.write()` on every tree change, which destroys any `contenteditable` state. The solution is to **pause MJML compilation** while editing.

```
Double-click node
  → editorStore.startEditing(nodeId)
  → pauseCompiler()
  → inject contenteditable="true" on the text element in iframe DOM
  → focus + select all text

User types (no recompilation happens)

Blur / Escape
  → read innerHTML from the contenteditable element
  → editorStore.updateNodeContent(nodeId, content)
  → editorStore.stopEditing()
  → resumeCompiler() → iframe re-renders with final content
```

### Finding the Text Element

MJML compiles components into nested table structures. The `css-class="node-{id}"` attribute ends up on different elements depending on the component type (often a `<td>`, not a `<div>`). The `findTextContainer()` function handles each case:

- **mj-text/mj-heading**: `css-class` → `<td>` → find direct `<div>` child
- **mj-button/mj-navbar-link**: `css-class` → `<td>` → find `<a>` descendant
- **mj-social-element**: `css-class` → wrapper → find `<a>` with label text or last non-icon `<td>`
- **mj-table**: `css-class` → `<td>` → find child `<table>`

---

## Files Changed

### Modified

- **`src/stores/editor.store.ts`** — Added `editingNodeId` ref, `startEditing()`, `stopEditing()` actions
- **`src/composables/useMjmlCompiler.ts`** — Added `pause()` / `resume()` to skip recompilation while editing; queues pending compile and fires on resume
- **`src/components/canvas/CanvasIframe.vue`** — Core inline editing logic:
  - `INLINE_EDITABLE_TYPES` set defining which components support inline edit
  - `findTextContainer(rootEl, nodeType)` to locate the correct DOM element
  - `startInlineEdit()` / `stopInlineEdit()` to manage contenteditable lifecycle
  - `dblclick` handler on iframe document to trigger edit mode
  - Skips `doc.write()` iframe replacement while `activeEditElement` is set
  - Click/hover handlers pass through during editing for cursor placement
- **`src/components/editor/Canvas.vue`** — Wiring:
  - `nodeTypeMap` computed property (id → type) passed to CanvasIframe
  - `onEditStart()` → select node, start editing, pause compiler
  - `onEditEnd()` → commit content, stop editing, resume compiler
  - SelectionBox hidden via `v-if="!editorStore.editingNodeId"` during editing
