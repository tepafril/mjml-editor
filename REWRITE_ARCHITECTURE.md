# MJML Editor — Rewrite Architecture Proposal

> **Status:** Proposal — Not yet implemented  
> **Date:** 2026-04-02  
> **Scope:** Full rewrite of `src/` following Feature-Sliced Design + Command Pattern + Editor Facade

---

## Table of Contents

1. [Why Rewrite](#why-rewrite)
2. [Current Pain Points](#current-pain-points)
3. [Core Patterns](#core-patterns)
4. [Directory Structure](#directory-structure)
5. [Pattern 1: Feature-Sliced Design](#pattern-1-feature-sliced-design)
6. [Pattern 2: Command Pattern for Mutations](#pattern-2-command-pattern-for-mutations)
7. [Pattern 3: useEditor() Facade](#pattern-3-useeditor-facade)
8. [Pattern 4: Flat Normalized Tree (Optional)](#pattern-4-flat-normalized-tree-optional)
9. [What Changes vs. What Stays](#what-changes-vs-what-stays)
10. [Migration Order](#migration-order)

---

## Why Rewrite

The current codebase is functional and well-typed, but has structural friction that compounds as the app grows:

- Components import from 3–4 stores directly, making refactoring ripple everywhere
- Undo/redo stores up to 100 full JSON snapshots of the entire tree — memory-heavy and coarse-grained
- Business logic is spread across composables and store actions with no clear boundary
- The `selectedNode` computed getter has a side effect (merges default props into state)
- Canvas ↔ CanvasIframe coupling is implicit and fragile

A rewrite with clear structural rules will make each of these fixable in isolation.

---

## Current Pain Points

| Pain Point | Root Cause | Impact |
|---|---|---|
| Components reach into multiple stores | No facade layer | High coupling, hard to refactor |
| 100 full JSON snapshots for undo/redo | No Command pattern | High memory, no history metadata |
| `selectedNode` getter mutates state | Side effect in computed | Unpredictable reactivity |
| Canvas/CanvasIframe tightly coupled | No owner of canvas state | Fragile `toolbarActive` prop chain |
| Stores organized by entity, not feature | Flat technical structure | Related code is far apart |
| 50+ templates loaded eagerly | No lazy loading | Bloated initial bundle |

---

## Core Patterns

Three patterns work together to solve the above:

```
Feature-Sliced Design   →  solves: code organization, coupling
Command Pattern         →  solves: undo/redo, mutation safety
useEditor() Facade      →  solves: component API surface, store access
```

---

## Directory Structure

```
src/
├── features/                  # Each feature owns its store, composables, types
│   ├── editor-tree/           # Core tree: state, selection, mutations
│   │   ├── store.ts
│   │   ├── commands/          # Insert, Remove, Move, UpdateProps, Duplicate…
│   │   ├── tree-utils.ts      # findById, flatten, insert, remove, move
│   │   └── index.ts           # Public API for this feature
│   │
│   ├── history/               # Command-based undo/redo
│   │   ├── store.ts
│   │   └── index.ts
│   │
│   ├── drag-drop/             # Drag state + event handlers
│   │   ├── store.ts
│   │   ├── useDragDrop.ts
│   │   └── index.ts
│   │
│   ├── compilation/           # MJML compiler + debounce logic
│   │   ├── useMjmlCompiler.ts
│   │   └── index.ts
│   │
│   ├── email-settings/        # Head store (fonts, styles, globalAttrs, title)
│   │   ├── store.ts
│   │   └── index.ts
│   │
│   ├── templates/             # Template library, search, category filter
│   │   ├── store.ts
│   │   ├── useTemplates.ts
│   │   └── index.ts
│   │
│   └── import-export/         # JSON / MJML / HTML export and import
│       ├── useImportExport.ts
│       └── index.ts
│
├── composables/
│   └── useEditor.ts           # ← THE FACADE: single API for all features
│
├── components/
│   ├── canvas/                # Iframe, selection overlay, inline editor
│   ├── panels/
│   │   ├── left/              # ComponentLibrary, SectionsPanel, SavedSections
│   │   └── right/             # PropsPanel, LayerTree
│   ├── toolbar/               # Toolbar, SettingsDialog, TemplatesDialog
│   └── ui/                    # Primitive/dumb UI components
│
├── entities/
│   ├── node/                  # EditorNode type, NodeType, defaultProps, createNode()
│   └── template/              # EmailTemplate type
│
└── shared/
    ├── types/                 # Shared interfaces (not feature-specific)
    └── utils/                 # Pure utility functions (no store deps)
```

---

## Pattern 1: Feature-Sliced Design

### Rule

Each directory under `features/` is self-contained. It owns:
- Its Pinia store
- Its composables (business logic)
- Its TypeScript types (if feature-specific)
- A public `index.ts` that defines what is exported

### Rule: Import direction

```
components/  →  can import from  →  composables/, entities/, shared/
composables/ →  can import from  →  features/, entities/, shared/
features/    →  can import from  →  entities/, shared/
entities/    →  can import from  →  shared/
shared/      →  no local imports
```

Components **never** import directly from `features/*/store.ts`. They go through `useEditor()`.

### Example: editor-tree feature

```ts
// features/editor-tree/index.ts
export { useEditorTreeStore } from './store'
export type { EditorTreeState } from './store'
// Commands are internal — not exported directly
```

```ts
// features/editor-tree/store.ts
export const useEditorTreeStore = defineStore('editor-tree', () => {
  const root = ref<EditorNode>(createDefaultTree())
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)
  const editingNodeId = ref<string | null>(null)

  const selectedNode = computed(() =>
    selectedId.value ? findById(root.value, selectedId.value) : null
  )
  // selectedNode is READ-ONLY — no side effects here

  // Low-level mutations (called by commands only)
  function _insert(node: EditorNode, parentId: string, index: number) { ... }
  function _remove(nodeId: string) { ... }
  function _move(nodeId: string, newParentId: string, index: number) { ... }
  function _updateProps(nodeId: string, props: Record<string, string>) { ... }

  return { root, selectedId, hoveredId, editingNodeId, selectedNode,
           _insert, _remove, _move, _updateProps }
})
```

---

## Pattern 2: Command Pattern for Mutations

### Why

The current undo/redo stores up to 100 full JSON snapshots. On a complex email (50+ nodes), each snapshot can be 20–50 KB. With the Command pattern:

- Each command is ~100 bytes (just the parameters)
- History can hold thousands of steps without noticeable memory cost
- Each history entry has a `description` for future history UI
- Compound operations (multi-select delete) are trivial to implement

### Command Interface

```ts
// entities/node/command.ts
export interface Command {
  execute(): void
  undo(): void
  description: string
}
```

### Example Commands

```ts
// features/editor-tree/commands/insert-node.command.ts
export class InsertNodeCommand implements Command {
  description: string

  constructor(
    private store: EditorTreeStore,
    private node: EditorNode,
    private parentId: string,
    private index: number
  ) {
    this.description = `Insert ${node.type}`
  }

  execute() {
    this.store._insert(this.node, this.parentId, this.index)
  }

  undo() {
    this.store._remove(this.node.id)
  }
}
```

```ts
// features/editor-tree/commands/move-node.command.ts
export class MoveNodeCommand implements Command {
  description = 'Move node'
  private originalParentId: string
  private originalIndex: number

  constructor(
    private store: EditorTreeStore,
    private nodeId: string,
    private newParentId: string,
    private newIndex: number
  ) {
    // Capture original position at construction time
    const { parentId, index } = store.getNodePosition(nodeId)
    this.originalParentId = parentId
    this.originalIndex = index
  }

  execute() {
    this.store._move(this.nodeId, this.newParentId, this.newIndex)
  }

  undo() {
    this.store._move(this.nodeId, this.originalParentId, this.originalIndex)
  }
}
```

```ts
// features/editor-tree/commands/update-props.command.ts
export class UpdatePropsCommand implements Command {
  description = 'Update props'
  private previousProps: Record<string, string>

  constructor(
    private store: EditorTreeStore,
    private nodeId: string,
    private nextProps: Record<string, string>
  ) {
    // Capture current props as snapshot (just this node, not the whole tree)
    this.previousProps = { ...store.selectedNode?.props }
  }

  execute() { this.store._updateProps(this.nodeId, this.nextProps) }
  undo()    { this.store._updateProps(this.nodeId, this.previousProps) }
}
```

### History Store

```ts
// features/history/store.ts
export const useHistoryStore = defineStore('history', () => {
  const past = ref<Command[]>([])
  const future = ref<Command[]>([])

  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)

  function execute(command: Command) {
    command.execute()
    past.value.push(command)
    future.value = []   // Clear redo stack on new action
  }

  function undo() {
    const command = past.value.pop()
    if (!command) return
    command.undo()
    future.value.push(command)
  }

  function redo() {
    const command = future.value.pop()
    if (!command) return
    command.execute()
    past.value.push(command)
  }

  return { past, future, canUndo, canRedo, execute, undo, redo }
})
```

### Command List (to implement)

| Command | execute | undo |
|---|---|---|
| `InsertNodeCommand` | `_insert(node, parentId, index)` | `_remove(node.id)` |
| `RemoveNodeCommand` | `_remove(nodeId)` | `_insert(snapshot, parentId, index)` |
| `MoveNodeCommand` | `_move(nodeId, newParent, index)` | `_move(nodeId, origParent, origIndex)` |
| `UpdatePropsCommand` | `_updateProps(id, next)` | `_updateProps(id, prev)` |
| `UpdateContentCommand` | `_updateContent(id, next)` | `_updateContent(id, prev)` |
| `DuplicateNodeCommand` | `_insert(clone, parentId, index+1)` | `_remove(clone.id)` |
| `BatchCommand` | run multiple commands | undo in reverse order |

`BatchCommand` composes multiple commands into one undoable step (e.g., paste a section with all its children).

---

## Pattern 3: useEditor() Facade

### Why

Currently, components like `PropsPanel.vue` and `LayerTree.vue` import from 2–3 stores directly. When store APIs change, every component that imports them needs updating.

The facade pattern centralizes this: **one import, stable API**.

### The Facade

```ts
// composables/useEditor.ts
import { useEditorTreeStore } from '@/features/editor-tree'
import { useHistoryStore } from '@/features/history'
import { useDragStore } from '@/features/drag-drop'
import { useEmailSettingsStore } from '@/features/email-settings'
import { useCompilation } from '@/features/compilation'
import {
  InsertNodeCommand,
  RemoveNodeCommand,
  MoveNodeCommand,
  UpdatePropsCommand,
  DuplicateNodeCommand,
} from '@/features/editor-tree/commands'

export function useEditor() {
  const tree = useEditorTreeStore()
  const history = useHistoryStore()
  const drag = useDragStore()
  const settings = useEmailSettingsStore()
  const { compiledHtml, mjmlSource, compileError } = useCompilation()

  // --- Tree Mutations (all go through history) ---

  function insertNode(type: NodeType, parentId: string, index: number) {
    const node = createNode(type)
    history.execute(new InsertNodeCommand(tree, node, parentId, index))
  }

  function removeNode(nodeId: string) {
    history.execute(new RemoveNodeCommand(tree, nodeId))
  }

  function moveNode(nodeId: string, newParentId: string, index: number) {
    history.execute(new MoveNodeCommand(tree, nodeId, newParentId, index))
  }

  function updateProps(nodeId: string, props: Record<string, string>) {
    history.execute(new UpdatePropsCommand(tree, nodeId, props))
  }

  function duplicateNode(nodeId: string) {
    history.execute(new DuplicateNodeCommand(tree, nodeId))
  }

  // --- Direct actions (no undo needed) ---

  function select(nodeId: string | null) { tree.selectedId = nodeId }
  function hover(nodeId: string | null) { tree.hoveredId = nodeId }
  function startEditing(nodeId: string) { tree.editingNodeId = nodeId }
  function stopEditing() { tree.editingNodeId = null }

  return {
    // State (readonly)
    tree: readonly(tree.root),
    selectedId: readonly(tree.selectedId),
    selectedNode: tree.selectedNode,  // computed ref
    hoveredId: readonly(tree.hoveredId),
    editingNodeId: readonly(tree.editingNodeId),

    // Mutations
    insertNode,
    removeNode,
    moveNode,
    updateProps,
    duplicateNode,

    // Selection / UI state
    select,
    hover,
    startEditing,
    stopEditing,

    // History
    undo: history.undo,
    redo: history.redo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,

    // Drag
    drag,

    // Compilation
    compiledHtml,
    mjmlSource,
    compileError,

    // Settings
    settings,
  }
}
```

### Component Usage (before vs after)

**Before:**
```ts
// PropsPanel.vue
const editorStore = useEditorStore()
const historyStore = useHistoryStore()
const headStore = useHeadStore()

function updateProp(key: string, value: string) {
  editorStore.updateNodeProps(editorStore.selectedId!, { [key]: value })
  historyStore.push(JSON.stringify(editorStore.tree))  // full snapshot
}
```

**After:**
```ts
// PropsPanel.vue
const editor = useEditor()

function updateProp(key: string, value: string) {
  editor.updateProps(editor.selectedId!, { [key]: value })
  // history is handled automatically inside the command
}
```

---

## Pattern 4: Flat Normalized Tree (Optional)

This is an optional optimization. Instead of the current nested tree:

```ts
// Current: nested (O(n) lookups via recursion)
interface EditorNode {
  id: string
  children: EditorNode[]
  ...
}
```

Use a flat map:

```ts
// Proposed: flat (O(1) lookups)
interface FlatTreeStore {
  nodes: Map<string, EditorNode>   // id → node (children are id[] not EditorNode[])
  childrenOf: Map<string, string[]> // parentId → [childId, ...]
  parentOf: Map<string, string>    // childId → parentId
  rootId: string
}
```

**Trade-off:** More complex serialization/deserialization, but faster for large trees.

**Recommendation:** Skip this for the initial rewrite. Adopt it later if performance profiling shows `findById` as a bottleneck.

---

## What Changes vs. What Stays

| Aspect | Keep | Change |
|---|---|---|
| Vue 3 + TypeScript + Pinia | ✅ | — |
| Tailwind CSS + PrimeVue | ✅ | — |
| mjml-browser + nanoid | ✅ | — |
| `EditorNode` type + `NodeType` | ✅ → moves to `entities/node/` | slight move |
| `HeadSettings` type | ✅ → moves to `entities/` or `features/email-settings/` | slight move |
| Composables for business logic | ✅ | — |
| Iframe-based preview + CSS class tracking | ✅ | — |
| MJML serializer / deserializer | ✅ → moves to `features/` | slight move |
| Template config files | ✅ → lazy-loaded | loading strategy |
| Snapshot-based undo/redo | — | ✅ → Command pattern |
| Stores accessed directly in components | — | ✅ → via `useEditor()` |
| Technical directory structure | — | ✅ → Feature-Sliced |
| `selectedNode` side effect in getter | — | ✅ → moved to action |
| Full tree snapshot per keystroke | — | ✅ → per-node prop snapshot |

---

## Migration Order

When implementing, build in this order to keep the app functional at each step:

1. **Scaffold directories** — create the new folder structure, leave old code in place
2. **Move `entities/`** — `EditorNode`, `NodeType`, `defaultProps`, `createNode()` — no logic change, just relocation
3. **Rebuild `features/editor-tree/store.ts`** — expose `_insert`, `_remove`, `_move`, `_updateProps` as low-level primitives
4. **Implement Command classes** — one by one, starting with `UpdatePropsCommand` (most used)
5. **Rebuild `features/history/store.ts`** — command-based, replacing snapshot store
6. **Write `composables/useEditor.ts`** — the facade
7. **Migrate components** — replace multi-store imports with `useEditor()` one by one
8. **Move remaining features** — drag-drop, compilation, settings, templates, import-export
9. **Delete old files** — after all components are migrated

---

*This document is a proposal. Implementation has not started.*
