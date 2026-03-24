# Template Logic: Variables, Loops, Conditionals

## Context

The editor builds email templates that are sent to a backend for processing. The backend needs the final HTML to contain template syntax — variables (`{{contact.first_name}}`), loops (`foreach="contacts"`), and conditionals (`if="expression"`). The MJML compiler strips unknown attributes, so we can't simply add `foreach`/`if` to MJML tags. Instead, we store template logic as metadata on EditorNode and inject it into the compiled HTML during export using the existing `css-class="node-{id}"` anchors.

**Flow:** Draw template → Serialize to MJML (with node-id classes) → Compile to HTML → Inject foreach/if attributes onto matching elements → Strip node-id classes → Send to backend

---

## Phase 1: Data Model

### Add `TemplateLogic` to EditorNode

**File: `src/types/node.types.ts`**

```typescript
export interface TemplateLogic {
  foreach?: string    // collection name, e.g. "contacts"
  foreachAs?: string  // iteration variable, e.g. "contact"
  if?: string         // condition expression, e.g. "contact.first_name == 'tep'"
}

// Add to EditorNode:
templateLogic?: TemplateLogic
```

### Fix `deepClone` to preserve templateLogic

**File: `src/utils/treeUtils.ts`** — line 63

```typescript
export function deepClone(node: EditorNode): EditorNode {
  return {
    ...node,
    id: nanoid(),
    props: { ...node.props },
    children: node.children.map(deepClone),
    templateLogic: node.templateLogic ? { ...node.templateLogic } : undefined,
  }
}
```

### Add store action

**File: `src/stores/editor.store.ts`**

Add `updateNodeTemplateLogic(id, logic)` — calls `snapshot()`, finds node, merges logic, cleans empty values.

---

## Phase 2: Variable Insertion

Variables (`{{contact.first_name}}`) live directly in `node.content`. Two ways to insert them:

### A. Direct typing (already works)
User types `{{contact.first_name}}` in contenteditable or the Content textarea. No changes needed.

### B. Variable picker UI

**New file: `src/config/templateVariables.ts`**
- Static list of available variables grouped by entity (Contact, Company, etc.)
- Can be extended later to fetch from backend

**New component: `src/components/panels/VariablePicker.vue`**
- Dropdown button that shows grouped variable list
- On select, emits the variable string (e.g. `{{contact.first_name}}`)

**File: `src/components/panels/PropsPanel.vue`**
- Add "Insert Variable" button next to the Content textarea
- Clicking inserts the selected variable at cursor position in the textarea

---

## Phase 3: Loop/Conditional UI

**File: `src/components/panels/PropsPanel.vue`**

Add a collapsible "Template Logic" section at the bottom of PropsPanel for the selected node:

- **Loop (`foreach`)**: Text input — available on container types (`mj-section`, `mj-column`, `mj-wrapper`, `mj-group`)
- **Loop variable (`foreachAs`)**: Text input — optional, paired with foreach
- **Condition (`if`)**: Text input — available on all node types

These inputs call `editorStore.updateNodeTemplateLogic()`.

### Visual indicators in layer tree

**File: `src/components/panels/LayerItem.vue`**

Show small icons (Repeat for loop, GitBranch for conditional) next to node label when `templateLogic` is set.

---

## Phase 4: Export Pipeline

**New file: `src/utils/templateExporter.ts`**

```
buildTemplateHtml(root, head) → string
```

Steps:
1. Build MJML using `buildFullMjml()` (includes `css-class="node-{id}"` on all elements)
2. Compile to HTML via `mjml2html()`
3. Parse HTML with DOMParser
4. Walk the flattened EditorNode tree — for each node with `templateLogic`:
   - Find element by `.node-{id}` class
   - Set `foreach` / `if` attributes on it
5. Strip all `node-*` classes from output
6. Return cleaned HTML string

**File: `src/composables/useImportExport.ts`**

Add `exportTemplateHtml()` that uses the new `buildTemplateHtml()` function. This is the export the backend consumes.

---

## Phase 5: Preview Handling

- **Variables**: Show as literal `{{...}}` text in canvas — works already since MJML treats it as plain text
- **Loops/Conditionals**: Not visible in preview (metadata only) — content renders once, which is correct for design-time
- **Indicators**: SelectionBox label or layer tree icons hint that logic is attached

---

## Files to Modify

| File | Change |
|------|--------|
| `src/types/node.types.ts` | Add `TemplateLogic` interface, add field to `EditorNode` |
| `src/utils/treeUtils.ts` | Update `deepClone` to copy `templateLogic` |
| `src/stores/editor.store.ts` | Add `updateNodeTemplateLogic` action |
| `src/config/templateVariables.ts` | **New** — variable definitions |
| `src/components/panels/VariablePicker.vue` | **New** — dropdown variable picker |
| `src/components/panels/PropsPanel.vue` | Add variable picker + template logic section |
| `src/components/panels/LayerItem.vue` | Add loop/condition visual indicators |
| `src/utils/templateExporter.ts` | **New** — HTML export with template syntax injection |
| `src/composables/useImportExport.ts` | Add `exportTemplateHtml()` |

---

## Verification

1. Select a text node → insert `{{contact.first_name}}` via variable picker → shows in content textarea and canvas preview
2. Select a section → set `foreach="contacts"` in Template Logic panel → icon appears in layer tree
3. Select a text node → set `if="contact.active == true"` → icon appears in layer tree
4. Export Template HTML → open output → verify `foreach` and `if` attributes present on correct HTML elements, variables intact, no `node-*` classes remaining
5. Undo/redo template logic changes → verify they revert correctly
6. Duplicate a node with template logic → verify clone has its own copy
