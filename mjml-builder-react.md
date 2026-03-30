# MJML Email Editor — Vue 3 to React.js + Shadcn UI Migration Plan

## Context

The current project is a fully functional visual drag-and-drop MJML email editor built with **Vue 3 + PrimeVue + Pinia + Tailwind CSS 4**. The goal is to recreate the **exact same application** in **React.js + Shadcn UI + Zustand + Tailwind CSS 4**, producing a detailed plan an AI agent can execute step-by-step with zero ambiguity.

The editor features: 3-panel layout, live MJML compilation, inline text editing with formatting toolbar, drag & drop (library + reordering), undo/redo, import/export, email settings (fonts/CSS/meta), FLIP animations, and template variables.

---

## Tech Stack Mapping

| Vue Project | React Project |
|---|---|
| Vue 3 | React 18+ |
| Pinia (5 stores) | Zustand (5 stores) + immer middleware |
| PrimeVue (Dialog, AutoComplete) | Shadcn UI (Dialog, Command, Popover, Tabs, Select, Input, Textarea, Button, Tooltip) |
| Tailwind CSS 4 | Tailwind CSS 4 (identical) |
| lucide-vue-next | lucide-react |
| Vue composables (5) | React custom hooks (5) |
| Vite + vue-tsc | Vite + tsc |
| mjml-browser | mjml-browser (identical) |
| nanoid | nanoid (identical) |

---

## Target File Tree

```
mjml-editor-react/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── components.json                    # Shadcn config
├── public/
│   ├── favicon.svg                    # copy from Vue project
│   └── icons.svg                      # copy from Vue project
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── style.css
    ├── lib/
    │   └── utils.ts                   # Shadcn cn() utility
    ├── types/
    │   ├── node.types.ts              # COPY verbatim from Vue
    │   ├── drag.types.ts              # COPY verbatim from Vue
    │   └── mjml.types.ts              # COPY verbatim from Vue
    ├── config/
    │   ├── googleFonts.ts             # COPY verbatim from Vue
    │   └── templateVariables.ts       # COPY verbatim from Vue
    ├── utils/
    │   ├── treeUtils.ts               # COPY verbatim from Vue
    │   ├── defaultProps.ts            # COPY verbatim from Vue
    │   ├── mjmlSerializer.ts          # COPY verbatim from Vue
    │   ├── mjmlDeserializer.ts        # COPY verbatim from Vue
    │   └── templateExporter.ts        # COPY verbatim from Vue
    ├── stores/
    │   ├── history.store.ts           # Rewrite: Pinia → Zustand
    │   ├── editor.store.ts            # Rewrite: Pinia → Zustand + immer
    │   ├── head.store.ts              # Rewrite: Pinia → Zustand + immer
    │   ├── preview.store.ts           # Rewrite: Pinia → Zustand
    │   └── drag.store.ts              # Rewrite: Pinia → Zustand
    ├── hooks/
    │   ├── useMjmlCompiler.ts         # Rewrite: Vue composable → React hook
    │   ├── useDragDrop.ts             # Rewrite: Vue composable → React hook
    │   ├── useFlipAnimation.ts        # Rewrite: Vue composable → React hook
    │   ├── useKeyboardShortcuts.ts    # Rewrite: Vue composable → React hook
    │   └── useImportExport.ts         # Rewrite: Vue composable → React hook
    ├── components/
    │   ├── ui/                        # Shadcn-generated + custom
    │   │   ├── button.tsx             # Shadcn generated
    │   │   ├── dialog.tsx             # Shadcn generated
    │   │   ├── input.tsx              # Shadcn generated
    │   │   ├── textarea.tsx           # Shadcn generated
    │   │   ├── select.tsx             # Shadcn generated
    │   │   ├── command.tsx            # Shadcn generated
    │   │   ├── popover.tsx            # Shadcn generated
    │   │   ├── tabs.tsx               # Shadcn generated
    │   │   ├── tooltip.tsx            # Shadcn generated
    │   │   ├── IconButton.tsx         # Custom (port from Vue)
    │   │   ├── UnitInput.tsx          # Custom (port from Vue)
    │   │   ├── ColorPicker.tsx        # Custom (port from Vue)
    │   │   ├── AlignmentToggle.tsx    # Custom (port from Vue)
    │   │   ├── CssClassInput.tsx      # Custom (port from Vue)
    │   │   └── FontFamilySelect.tsx   # Custom (port from Vue, PrimeVue AutoComplete → Shadcn Command)
    │   ├── editor/
    │   │   ├── AppShell.tsx           # Port from Vue
    │   │   ├── Toolbar.tsx            # Port from Vue
    │   │   ├── LeftPanel.tsx          # Port from Vue
    │   │   ├── RightPanel.tsx         # Port from Vue
    │   │   └── Canvas.tsx             # Port from Vue (MOST COMPLEX)
    │   ├── canvas/
    │   │   ├── CanvasIframe.tsx       # Port from Vue
    │   │   ├── SelectionBox.tsx       # Port from Vue
    │   │   ├── DropZoneIndicator.tsx  # Port from Vue
    │   │   ├── DragGhost.tsx          # Port from Vue
    │   │   └── InlineEditToolbar.tsx  # Port from Vue
    │   └── panels/
    │       ├── ComponentLibrary.tsx   # Port from Vue
    │       ├── LayerTree.tsx          # Port from Vue
    │       ├── LayerItem.tsx          # Port from Vue
    │       ├── PropsPanel.tsx         # Port from Vue (~500 lines, 18+ conditional sections)
    │       ├── SpacingControl.tsx     # Port from Vue
    │       ├── VariablePicker.tsx     # Port from Vue
    │       └── EmailSettingsPanel.tsx # Port from Vue (5 tabs)
```

---

## Phase 0: Project Scaffolding

### Step 0.1 — Create React + Vite project
```bash
cd /Users/tepafril/Documents/projects
npm create vite@latest mjml-editor-react -- --template react-ts
cd mjml-editor-react
```

### Step 0.2 — Install dependencies
```bash
# Core
npm install zustand immer nanoid mjml-browser lucide-react

# Dev
npm install -D tailwindcss @tailwindcss/vite @types/node
```

### Step 0.3 — Initialize Shadcn UI
```bash
npx shadcn@latest init
# Style: Default, Base color: Slate, CSS variables: Yes

npx shadcn@latest add dialog tabs select input textarea button tooltip command popover
```

### Step 0.4 — Configure `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

### Step 0.5 — Configure TypeScript paths
Ensure `tsconfig.json` / `tsconfig.app.json` has:
```json
"compilerOptions": {
  "paths": { "@/*": ["./src/*"] }
}
```

### Step 0.6 — Global CSS (`src/style.css`)
```css
@import "tailwindcss";

html, body, #root {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
```

Override Shadcn CSS variables to use the indigo primary palette:
- `--primary`: hsl from #4C43E8 (indigo-600)
- `--primary-foreground`: white
- Full palette: 50:#EEF2FF, 100:#E0E7FF, 200:#C6D1FF, 300:#A4B3FD, 400:#7F8AFA, 500:#6164F3, 600:#4C43E8, 700:#4036CC, 800:#352EA5, 900:#302D82, 950:#1E1B4E

### Step 0.7 — Entry points
**`src/main.tsx`**: Create React root, render `<App />` inside `<React.StrictMode>`.
**`src/App.tsx`**: Render `<AppShell />`.

### Step 0.8 — Copy static assets
Copy `public/favicon.svg` and `public/icons.svg` from Vue project.

**Deliverable:** Empty React app running with Tailwind CSS 4 + Shadcn UI.

---

## Phase 1: Types, Config & Utilities (Pure TypeScript — No React)

All files below are **framework-agnostic**. Copy verbatim from the Vue project. Only change needed: ensure import paths use `@/` alias correctly.

### Step 1.1 — Type definitions
| Source (Vue) | Destination (React) | Notes |
|---|---|---|
| `src/types/node.types.ts` | `src/types/node.types.ts` | Exports: `NodeType`, `EditorNode`, `TemplateLogic`, `ALLOWED_CHILDREN`, `LEAF_TYPES` |
| `src/types/drag.types.ts` | `src/types/drag.types.ts` | Exports: `DragSource`, `DropTarget` |
| `src/types/mjml.types.ts` | `src/types/mjml.types.ts` | Exports: `NODE_DEFAULT_PROPS`, `NODE_DEFAULT_CONTENT`, `GoogleFont`, `HeadSettings`, `createDefaultHeadSettings`. **Use `mjml.types.ts` not `mjml-v2.types.ts`** |

### Step 1.2 — Utility functions
| Source (Vue) | Destination (React) | Notes |
|---|---|---|
| `src/utils/treeUtils.ts` | `src/utils/treeUtils.ts` | Deps: `nanoid`, local types. Functions: `findById`, `findParent`, `flatten`, `insert`, `remove`, `move`, `updateProps`, `updateContent`, `deepClone`, `duplicate`, `getAncestorIds` |
| `src/utils/defaultProps.ts` | `src/utils/defaultProps.ts` | Deps: `nanoid`, types, `NODE_DEFAULT_PROPS/CONTENT`. Functions: `createNode(type, overrides?)`, `createDefaultTree()`. Auto-children logic for containers. |
| `src/utils/mjmlSerializer.ts` | `src/utils/mjmlSerializer.ts` | Functions: `serializeToMjml`, `buildFullMjml`, `buildExportMjml`, `buildFullExportMjml`. Adds `css-class="node-{id}"` markers. |
| `src/utils/mjmlDeserializer.ts` | `src/utils/mjmlDeserializer.ts` | Functions: `deserializeFromMjml` → `{ tree, head }`. DOM parser, pseudo-type inference (mj-heading, mj-avatar). |
| `src/utils/templateExporter.ts` | `src/utils/templateExporter.ts` | Functions: `buildTemplateHtml`. Keeps `@ts-expect-error` for mjml-browser import. |

### Step 1.3 — Config data
| Source (Vue) | Destination (React) | Notes |
|---|---|---|
| `src/config/googleFonts.ts` | `src/config/googleFonts.ts` | Top 100 fonts + `buildGoogleFontUrl()` + `GoogleFontEntry` interface |
| `src/config/templateVariables.ts` | `src/config/templateVariables.ts` | `TEMPLATE_VARIABLES` grouped by contact/company/other |

**Deliverable:** All types, utils, configs ported. Validate: `npx tsc --noEmit`.

---

## Phase 2: Zustand Stores (5 stores)

### Step 2.1 — History Store (`src/stores/history.store.ts`)
- **State:** `past: string[]` (max 100), `future: string[]`
- **Actions:** `push(snapshot)`, `popUndo()`, `pushRedo(snapshot)`, `popRedo()`, `clear()`
- Derived at usage site: `canUndo = past.length > 0`, `canRedo = future.length > 0`
- Simple Zustand store, no immer needed

### Step 2.2 — Editor Store (`src/stores/editor.store.ts`) — MOST COMPLEX
- **Uses:** `zustand` + `zustand/middleware/immer`
- **State:** `tree: EditorNode`, `selectedId: string | null`, `hoveredId: string | null`, `editingNodeId: string | null`, `openSettingsTab: string | null`
- **Derived (at usage site, not in store):**
  - `selectedNode`: `useEditorStore(s => s.selectedId ? findById(s.tree, s.selectedId) : null)`
  - `canUndo`/`canRedo`: from history store
- **Actions (each snapshots before mutating):**
  - `snapshot()` — calls `useHistoryStore.getState().push(JSON.stringify(tree))`
  - `selectNode(id)` — sets `selectedId`
  - `hoverNode(id)` — sets `hoveredId`
  - `updateNodeProps(id, props)` — snapshot, then `treeUtils.updateProps(state.tree, id, props)` inside immer
  - `updateNodeContent(id, content)` — snapshot, then `treeUtils.updateContent(state.tree, id, content)` inside immer
  - `insertNode(node, parentId, index)` — snapshot, then `treeUtils.insert(state.tree, node, parentId, index)` inside immer
  - `moveNode(nodeId, targetParentId, index)` — snapshot, then `treeUtils.move(state.tree, ...)` inside immer
  - `removeNode(id)` — snapshot, then `treeUtils.remove(state.tree, id)` inside immer; clear `selectedId` if it matches
  - `duplicateNode(id)` — snapshot, then `treeUtils.duplicate(state.tree, id)` inside immer
  - `loadTree(newTree)` — snapshot, set `tree = newTree`, clear `selectedId`
  - `updateNodeTemplateLogic(id, logic)` — snapshot, find node, merge logic, clean empty keys
  - `toggleNodeHidden(id)` — find node inside immer, flip `node.hidden` (NEW action needed for React, since Vue could mutate props directly)
  - `startEditing(id)` / `stopEditing()` — set/clear `editingNodeId`
  - `undo()` — pop from history `past`, push current to `future`, replace tree
  - `redo()` — pop from history `future`, push current to `past`, replace tree
  - `requestOpenSettings(tab)` — sets `openSettingsTab`

**CRITICAL — immer pattern:**
```ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useEditorStore = create<EditorState>()(
  immer((set, get) => ({
    tree: createDefaultTree(),
    selectedId: null,
    // ...
    updateNodeProps: (id, props) => {
      get().snapshot()
      set(state => { treeUtils.updateProps(state.tree, id, props) })
    },
  }))
)
```

### Step 2.3 — Head Store (`src/stores/head.store.ts`)
- **Uses:** `zustand` + `zustand/middleware/immer`
- **State:** `settings: HeadSettings` (initialized with `createDefaultHeadSettings()`)
- **Actions:** `updateTitle`, `updatePreviewText`, `updateBreakpoint`, `updateStyles`, `addFont`, `removeFont`, `updateFont`, `updateGlobalAttribute`, `loadSettings`, `reset`
- All simple setters modifying `settings` inside immer

### Step 2.4 — Preview Store (`src/stores/preview.store.ts`)
- **State:** `mode: 'desktop' | 'mobile' | 'mjml-source'`
- **Actions:** `setMode(mode)`
- **Helper function (not in store):** `getCanvasWidth(mode)` → `'100%'` / `'375px'` / `'100%'`

### Step 2.5 — Drag Store (`src/stores/drag.store.ts`)
- **State:** `isDragging`, `dragSource: DragSource | null`, `dragOverNodeId`, `dropIndex`, `dropParentId`, `ghostPosition: {x, y}`
- **Actions:** `startDrag(source)`, `endDrag()`, `setGhostPosition(pos)`, `setDropTarget(parentId, index)`, `setDragOverNodeId(id)`

**Deliverable:** 5 Zustand stores. Validate: `npx tsc --noEmit`.

---

## Phase 3: React Custom Hooks (5 hooks)

### Step 3.1 — `useMjmlCompiler` (`src/hooks/useMjmlCompiler.ts`)
**Vue pattern:** `watch` with deep on tree + settings → debounce 150ms → compile via `mjml-browser`
**React pattern:**
- Subscribe to `tree` and `settings` from stores
- Serialize both as JSON for dependency comparison: `useMemo(() => JSON.stringify(tree), [tree])`
- `useEffect` watching serialized values → debounce 150ms via `setTimeout` → compile
- `pausedRef` as `useRef<boolean>` (not state) for pause/resume during inline editing
- `pendingRef` as `useRef<boolean>` for deferred compile on resume
- **Returns:** `{ compiledHtml: string, compileError: string | null, mjmlSource: string, pause(), resume() }`

### Step 3.2 — `useDragDrop` (`src/hooks/useDragDrop.ts`)
**Vue pattern:** Functions that read/write Pinia drag store
**React pattern:** Same functions, use `useDragStore.getState()` inside event handlers (not hooks)
- `onDragStart(e: DragEvent, source: DragSource)` — calls `dragStore.startDrag(source)`
- `onDragOver(e: DragEvent)` — calls `dragStore.setGhostPosition`
- `onDrop(e: DragEvent)` — resolves drop, creates/moves node
- `onDragEnd()` — calls `dragStore.endDrag()`
- **Returns:** `{ onDragStart, onDragOver, onDrop, onDragEnd }`

### Step 3.3 — `useFlipAnimation` (`src/hooks/useFlipAnimation.ts`)
**Vue pattern:** `ref()` for pendingFlip, isAnimating + setTimeout for cleanup
**React pattern:**
- `pendingFlipRef = useRef<FlipSnapshot | null>(null)`
- `isAnimatingRef = useRef(false)`
- `animationTimerRef = useRef<ReturnType<typeof setTimeout>>(null)`
- `captureBeforeMove(iframeDoc)` — snapshot all `[class*="node-"]` element positions
- `playFlipAnimation(iframeDoc)` — compare to snapshot, animate differences with CSS transforms
- `cancelFlip()` — clear timer, reset refs
- **Returns:** `{ captureBeforeMove, playFlipAnimation, cancelFlip, isAnimatingRef }`

### Step 3.4 — `useKeyboardShortcuts` (`src/hooks/useKeyboardShortcuts.ts`)
**Vue pattern:** `onMounted` / `onUnmounted` with keydown listener
**React pattern:**
```ts
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    const editor = useEditorStore.getState()  // always fresh state
    if (e.metaKey && e.key === 'z' && !e.shiftKey) { e.preventDefault(); editor.undo() }
    if (e.metaKey && e.key === 'z' && e.shiftKey) { e.preventDefault(); editor.redo() }
    if ((e.key === 'Delete' || e.key === 'Backspace') && editor.selectedId && !editor.editingNodeId) {
      e.preventDefault(); editor.removeNode(editor.selectedId)
    }
  }
  window.addEventListener('keydown', handleKey)
  return () => window.removeEventListener('keydown', handleKey)
}, [])
```

### Step 3.5 — `useImportExport` (`src/hooks/useImportExport.ts`)
**Vue pattern:** File picker + download helpers
**React pattern:** Identical logic. Use `useEditorStore.getState()` and `useHeadStore.getState()` in handlers.
- `exportMjml()` — serialize tree → download `.mjml`
- `exportTemplateHtml()` — compile with template logic → download `.html`
- `importMjml()` — file picker → read → deserialize → `loadTree()` + `loadSettings()`
- `downloadFile(content, filename, mime)` — creates blob URL, triggers download

**Deliverable:** 5 custom hooks ready for components.

---

## Phase 4: UI Components

### Step 4.1 — Custom UI components (port from Vue)

**`src/components/ui/IconButton.tsx`**
- Props: `{ disabled?, title?, active?, onClick?, children, className? }`
- Render: `<button>` with Tailwind classes `w-8 h-8 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-40`
- Active state: `bg-indigo-50 text-indigo-600`

**`src/components/ui/UnitInput.tsx`**
- Props: `{ value: string, onChange: (v: string) => void, label?, placeholder? }`
- Render: Flex column with label + Shadcn `<Input>` or styled `<input>`

**`src/components/ui/ColorPicker.tsx`**
- Props: `{ value: string, onChange: (v: string) => void, label? }`
- Render: Label + row of `<input type="color">` (24x24 circle) + hex text `<input>`, default `#000000`

**`src/components/ui/AlignmentToggle.tsx`**
- Props: `{ value: string, onChange: (v: string) => void }`
- Render: 3-button group (AlignLeft, AlignCenter, AlignRight from lucide-react), selected = `bg-indigo-600 text-white`

**`src/components/ui/CssClassInput.tsx`**
- Props: `{ value: string, onChange: (v: string) => void, placeholder? }`
- Render: Label "CSS Class" + input + helper text "Class name added to the HTML element"

**`src/components/ui/FontFamilySelect.tsx`**
- Props: `{ value: string, onChange: (v: string) => void, label? }`
- **Replaces PrimeVue AutoComplete with Shadcn `<Popover>` + `<Command>`:**
  - Click input → open popover with searchable font list
  - Fonts from `useHeadStore(s => s.settings.fonts)`, mapped to `"FontName, sans-serif"`
  - Settings gear icon → `useEditorStore.getState().requestOpenSettings('fonts')`

**Deliverable:** 6 custom UI components.

---

## Phase 5: Canvas Components

### Step 5.1 — `SelectionBox.tsx` (`src/components/canvas/SelectionBox.tsx`)
- Props: `{ rect, type: 'selected'|'hovered', draggable?, canMoveUp?, canMoveDown?, label?, onDragStart?, onMoveUp?, onMoveDown?, onDuplicate?, onDelete? }`
- Absolutely positioned div at `rect` coordinates
- **Selected:** solid blue border, label badge, grip handle (`onPointerDown`), action buttons (ChevronUp, ChevronDown, Copy, Trash2)
- **Hovered:** dashed border only, no controls

### Step 5.2 — `DropZoneIndicator.tsx` (`src/components/canvas/DropZoneIndicator.tsx`)
- Props: `{ visible, y, x?, width? }`
- Horizontal line + circle endpoints, pulse animation, absolute positioning
- CSS keyframe `drop-pulse` in global CSS or inline

### Step 5.3 — `DragGhost.tsx` (`src/components/canvas/DragGhost.tsx`)
- No props — reads `useDragStore` directly
- Uses `ReactDOM.createPortal(jsx, document.body)` (replaces Vue `<Teleport>`)
- Fixed position, follows `ghostPosition`, shows icon + label from ICON_MAP
- ICON_MAP: maps NodeType → lucide-react icon (Type, MousePointer, Image, etc.)

### Step 5.4 — `InlineEditToolbar.tsx` (`src/components/canvas/InlineEditToolbar.tsx`)
- Props: `{ iframeDoc, editingNodeId, onActiveChange }`
- Floating toolbar positioned above edited element
- Buttons: Bold, Italic, Underline, Subscript, Superscript
- Inputs: Font size (number), Color (color input), Font family (dropdown from loaded fonts)
- Uses `document.execCommand()` for formatting, `queryCommandValue()` for state
- Position calculation: `getIframeOffset()` + element rect, clamped to viewport
- Focus/blur tracking to emit `onActiveChange` (prevents edit blur during toolbar interaction)
- `useEffect` watching `editingNodeId` to recalculate position
- `useEffect` for scroll listener on iframe doc

### Step 5.5 — `CanvasIframe.tsx` (`src/components/canvas/CanvasIframe.tsx`)
- Props: `{ html, editingNodeId?, nodeTypes?, toolbarActive?, onNodeClick, onNodeHover, onIframeClick, onReady, onEditStart, onEditEnd }`
- `iframeRef = useRef<HTMLIFrameElement>(null)`
- **On mount (`useEffect([], ...)`):** Write initial HTML to iframe, inject styles, setup listeners, emit `onReady(doc)`
- **On `html` change (`useEffect([html])`):** Skip if actively editing (`activeEditRef.current`), otherwise rewrite iframe content + re-inject styles + re-setup listeners + emit `onReady(doc)`
- **On `editingNodeId` change (`useEffect([editingNodeId])`):** Start or stop inline editing
- **CRITICAL `toolbarActive` ref pattern:**
  ```ts
  const toolbarActiveRef = useRef(toolbarActive)
  useEffect(() => { toolbarActiveRef.current = toolbarActive }, [toolbarActive])
  ```
  Read `toolbarActiveRef.current` in blur handler to avoid stale closures
- **Inline editing:**
  - `INLINE_EDITABLE_TYPES`: mj-text, mj-heading, mj-button, mj-table, mj-social-element, mj-navbar-link, mj-accordion-title, mj-accordion-text
  - Double-click → `onEditStart(nodeId)`
  - `startInlineEdit()`: find text container via `findTextContainer()`, set `contenteditable`, focus, select all
  - `stopInlineEdit()`: remove contenteditable, get innerHTML, emit `onEditEnd(nodeId, content)`
  - Blur handler: 150ms delay to check `toolbarActiveRef`, then stop editing
  - Escape key: stop editing immediately
- **Style injection:** CSS for `[contenteditable]` (blue outline), `.node-*` cursor:pointer, hover/selected highlight classes

**Deliverable:** 5 canvas components.

---

## Phase 6: Panel Components

### Step 6.1 — `ComponentLibrary.tsx` (`src/components/panels/ComponentLibrary.tsx`)
- Search input (filters name + category, case-insensitive)
- Components grouped by category:
  - **Content:** Heading, Text, Button, Social, Navbar, Table
  - **Media:** Image, Avatar
  - **Layout:** Wrapper, Section, Column, Hero, Group, Divider, Spacer
  - **Advanced:** Accordion, HTML (mj-raw)
- 3-column grid, each card: icon + label, `draggable`, `onDragStart` → `dragStore.startDrag({ nodeType })`

### Step 6.2 — `LayerTree.tsx` (`src/components/panels/LayerTree.tsx`)
- Reads `useEditorStore(s => s.tree)`, renders `<LayerItem>` for each body child at `depth: 0`

### Step 6.3 — `LayerItem.tsx` (`src/components/panels/LayerItem.tsx`)
- Props: `{ node: EditorNode, depth: number }`
- Recursive: renders children as `<LayerItem depth={depth+1}>`
- `useState(true)` for expanded
- Features: visibility toggle (Eye/EyeOff → `editorStore.toggleNodeHidden(id)`), expand/collapse chevron, type icon, label, template logic indicators (Repeat amber for foreach, GitBranch amber for if), delete button (not for mj-body)
- Click → `selectNode(id)`, hover → `hoverNode(id)` / `hoverNode(null)`
- Indentation: `paddingLeft: depth * 12`
- Selected: indigo background, Hovered: ring highlight, Hidden: `opacity-40`

### Step 6.4 — `PropsPanel.tsx` (`src/components/panels/PropsPanel.tsx`) — LARGE
- Derive `node` from: `useEditorStore(s => s.selectedId ? findById(s.tree, s.selectedId) : null)`
- **Empty state:** icon + "Select an element to edit its properties"
- **18+ conditional sections based on node type:**

| # | Section | Shown when | Controls |
|---|---|---|---|
| 1 | Node info | Always | Type badge, node ID (first 8 chars) |
| 2 | Content | `HAS_CONTENT` types (mj-text, mj-heading, mj-button, etc.) | Textarea + VariablePicker |
| 3 | HTML content | `HAS_RAW_CONTENT` types (mj-table, mj-raw) | Textarea |
| 4 | Social network | mj-social-element | Select dropdown (facebook, twitter, x, instagram, etc.) |
| 5 | Image source | `HAS_SRC` types (mj-image, mj-avatar) | URL input + alt text input |
| 6 | Background | `HAS_BG_URL` types (mj-hero, mj-wrapper, mj-section) | Background image URL + position |
| 7 | Link href | `HAS_HREF` types (mj-button, mj-navbar-link, mj-social-element) | URL input |
| 8 | Hero mode | mj-hero | Select: fixed-height / fluid-height |
| 9 | Social mode | mj-social | Select: horizontal/vertical + icon size input |
| 10 | Navbar hamburger | mj-navbar | Select: hamburger toggle |
| 11 | Text transform | mj-navbar-link | Select: uppercase/capitalize/lowercase/none |
| 12 | Group direction | mj-group | Select: ltr/rtl |
| 13 | Accordion icon | mj-accordion | Select: left/right |
| 14 | Alignment | `HAS_ALIGN` types | AlignmentToggle (left/center/right) |
| 15 | Size | Most types | Width + Height inputs (2-col grid) |
| 16 | Spacing | `HAS_PADDING` types | SpacingControl component |
| 17 | Typography | Text-bearing types | Font size, line height, font family (FontFamilySelect), font weight |
| 18 | Colors | Most types | Text color (ColorPicker) + background color (ColorPicker) |
| 19 | Border radius | Applicable types | UnitInput |
| 20 | Divider props | mj-divider | Border color + border width |
| 21 | Accordion border | mj-accordion | Border input |
| 22 | Vertical align | mj-column, mj-hero, mj-group | Select: top/middle/bottom |
| 23 | Template logic | All types | Foreach variable + loop var + if condition (amber box) |
| 24 | Compound children | mj-social, mj-navbar, mj-accordion | List of children + add/delete buttons |

- All prop updates: `editorStore.updateNodeProps(node.id, { [key]: value })`

### Step 6.5 — `SpacingControl.tsx` (`src/components/panels/SpacingControl.tsx`)
- Props: `{ node: EditorNode }`
- Visual box-model diagram (3x3 grid), "padding" label
- `parsePadding(value)` → `{ top, right, bottom, left }` (1–4 value CSS shorthand)
- Each input calls `updatePadding(side, value)` → reconstruct shorthand → `updateNodeProps`

### Step 6.6 — `VariablePicker.tsx` (`src/components/panels/VariablePicker.tsx`)
- Props: `{ onInsert: (value: string) => void }`
- Button "Insert Variable" with Braces icon
- Dropdown/popover with grouped variables from `TEMPLATE_VARIABLES`
- Click variable → `onInsert('{{ variable }}')`, close dropdown

### Step 6.7 — `EmailSettingsPanel.tsx` (`src/components/panels/EmailSettingsPanel.tsx`)
- Props: `{ initialTab?: string }`
- Layout: Sidebar navigation (`w-40`) + content area (`flex-1`, scrollable), height `640px`
- `useState` for active tab
- **5 tabs:**

| Tab | Controls |
|---|---|
| **Body** | Background color (ColorPicker), Width input (default 600px), CSS class (CssClassInput) |
| **Email Meta** | Title input, Preview text input, Responsive breakpoint input (default 480px) |
| **Fonts** | Google Fonts browser (search + category filter: All/Sans-serif/Serif/Display/Handwriting/Monospace + scrollable font list with toggle buttons) + Loaded fonts list (name input + URL input + delete per font) + "Add custom font" button |
| **Custom CSS** | Textarea for CSS (`mj-style`), note about hover states |
| **Import/Export** | Import MJML button, Export MJML button, Export Template HTML button — uses `useImportExport` hook |

- Reads/writes `useHeadStore` for all settings
- Reads `useEditorStore(s => s.tree)` body props for width/bg-color/css-class

**Deliverable:** 7 panel components.

---

## Phase 7: Editor Layout Components

### Step 7.1 — `Toolbar.tsx` (`src/components/editor/Toolbar.tsx`)
- Left: Logo "SyncMusic" + Undo (Undo2 icon) / Redo (Redo2 icon) buttons
- Center: Preview toggle — Desktop (Monitor) / Mobile (Smartphone) / Source (Code)
- Right: Settings button (Settings icon) → opens Shadcn `<Dialog>` containing `<EmailSettingsPanel>`
- Dialog logic: `useState(false)` for `settingsOpen`, snapshot head + body props on open, restore on cancel
- `useEffect` watching `editorStore.openSettingsTab` → open dialog to specific tab, then clear
- Save button: close dialog. Cancel button: restore snapshots + close.

### Step 7.2 — `LeftPanel.tsx` (`src/components/editor/LeftPanel.tsx`)
- Fixed "Components" tab header + `<ComponentLibrary />`, right border, overflow auto

### Step 7.3 — `RightPanel.tsx` (`src/components/editor/RightPanel.tsx`)
- Two tabs: Properties | Layers (`useState` for active tab)
- Tab bar with indigo underline indicator
- Render `<PropsPanel />` or `<LayerTree />` based on active tab

### Step 7.4 — `Canvas.tsx` (`src/components/editor/Canvas.tsx`) — MOST COMPLEX (~570 lines)

**State management:**
- `useState`: `selectedRect`, `hoveredRects[]`, `dropIndicatorVisible`, `dropIndicatorY`, `dropIndicatorX`, `dropIndicatorWidth`
- `useRef`: `iframeDoc`, `canvasRef`, `isPointerDragging`, `resolvedDropParentId`, `resolvedDropIndex`, `resolvedAutoWrap`, `toolbarActive`, `startPointerPos`

**Store subscriptions:**
- `selectedId`, `hoveredId`, `editingNodeId` from editor store
- `mode` from preview store
- `isDragging`, `dragSource` from drag store
- `tree` from editor store (for node type lookups)

**Hooks used:**
- `useMjmlCompiler()` → `{ compiledHtml, mjmlSource, pause, resume }`
- `useFlipAnimation()` → `{ captureBeforeMove, playFlipAnimation, isAnimatingRef }`
- `useDragDrop()` → `{ onDragEnd }`

**Key functions (port from Vue, same logic):**
- `getNodeRect(nodeId)` — get element position from iframe DOM
- `updateSelectionRects()` — update overlay positions for selected + hovered ancestors
- `onIframeReady(doc)` — store iframe doc ref, trigger FLIP animation, update rects
- `resolveDropTarget(clientX, clientY)` — find best parent/index using iframe coordinates + `ALLOWED_CHILDREN` validation
- `onSelectionDragStart(e: PointerEvent)` — start dragging selected node via pointer events
- `onPointerDragMove(e: PointerEvent)` — update ghost + drop indicator
- `onPointerDragEnd(e: PointerEvent)` — execute move with FLIP
- `handleOverlayDragOver(e: DragEvent)` — library drag over canvas
- `handleOverlayDrop(e: DragEvent)` — create node with auto-wrap if needed
- `autoWrapAndInsert(nodeType, parentId, index)` — wrap in section > column if dropping to body

**Effects (`useEffect`):**
- `[selectedId, hoveredId]` → `updateSelectionRects()`
- `[mode]` → clear selection, update rects after transition
- `[compiledHtml]` → (handled by CanvasIframe re-render + onReady callback)
- `[]` (mount) → add global `dragover`/`dragend` listeners, return cleanup

**JSX structure:**
```
<div ref={canvasRef} className="flex-1 flex items-start justify-center overflow-auto bg-gray-100 relative">
  {mode === 'mjml-source' ? (
    <pre>{mjmlSource}</pre>
  ) : (
    <>
      <div style={{ width: canvasWidth, transition }}>
        <CanvasIframe html={compiledHtml} ... callbacks />
      </div>
      {isDragging && <div className="absolute inset-0 z-10" onDragOver={...} onDrop={...} />}
      <SelectionBox rect={selectedRect} type="selected" ... />
      {hoveredRects.map(r => <SelectionBox key={r.id} rect={r.rect} type="hovered" />)}
      <InlineEditToolbar iframeDoc={iframeDoc} editingNodeId={editingNodeId} />
      <DragGhost />
      <DropZoneIndicator visible={dropIndicatorVisible} y={dropIndicatorY} ... />
    </>
  )}
</div>
```

**CRITICAL React-specific patterns:**
1. Use `useCallback` for all handlers passed to `CanvasIframe` to prevent unnecessary re-renders
2. Use `useRef` + `useEffect` pattern for values read in event handlers to avoid stale closures
3. Use `useEditorStore.getState()` / `useDragStore.getState()` inside event handlers for fresh state

### Step 7.5 — `AppShell.tsx` (`src/components/editor/AppShell.tsx`)
```tsx
export function AppShell() {
  useKeyboardShortcuts()
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-60 shrink-0 overflow-hidden"><LeftPanel /></div>
        <Canvas />
        <div className="w-72 shrink-0 overflow-hidden"><RightPanel /></div>
      </div>
    </div>
  )
}
```

**Deliverable:** Complete working editor.

---

## Phase 8: Polish & Animations

### Step 8.1 — CSS animations (add to `src/style.css`)
- `@keyframes drop-pulse` for DropZoneIndicator (opacity 1 → 0.6)
- Layer expand/collapse transition (max-height + opacity)
- Ghost fade-in transition

### Step 8.2 — Portal for DragGhost
Ensure `DragGhost` uses `ReactDOM.createPortal(content, document.body)`

### Step 8.3 — Auto-wrap logic verification
Test: dragging mj-text directly onto mj-body should auto-create mj-section → mj-column → mj-text

### Step 8.4 — Pseudo-type handling verification
- mj-heading serializes as mj-text with `font-size:20px` + `font-weight:bold`
- mj-avatar serializes as mj-image with `border-radius:50%`
- Deserializer infers pseudo-types back

---

## Verification Plan

### Manual Testing Checklist
1. **App loads** — Shows 3-panel layout with default tree (heading + text + button)
2. **Canvas rendering** — MJML compiles to HTML, displays in iframe
3. **Node selection** — Click element → blue selection box with controls
4. **Node hover** — Hover → dashed outlines on ancestors in layer tree
5. **Props editing** — Change color/font/padding → live preview updates
6. **Inline editing** — Double-click text → contenteditable → formatting toolbar works
7. **Drag from library** — Drag component → ghost follows → drop indicator shows → new node created
8. **Drag to reorder** — Grip handle → drag → FLIP animation → node moves
9. **Auto-wrap** — Drag text to body level → section+column auto-created
10. **Undo/Redo** — Cmd+Z / Cmd+Shift+Z work, toolbar buttons update
11. **Delete** — Backspace/Delete removes selected, trash icon in selection box works
12. **Duplicate** — Copy button duplicates node
13. **Move up/down** — Arrow buttons reorder within parent
14. **Layer tree** — Expand/collapse, click to select, eye to toggle visibility
15. **Preview modes** — Desktop (100%), Mobile (375px), Source (raw MJML)
16. **Settings dialog** — All 5 tabs work, Save persists, Cancel reverts
17. **Google Fonts** — Search, filter by category, toggle on/off, custom font add
18. **Import/Export** — Import .mjml file, export .mjml, export template HTML
19. **Template variables** — Insert `{{ variable }}` into text content
20. **Template logic** — Set foreach/if in props panel, export includes attributes
21. **Keyboard shortcuts** — Cmd+Z, Cmd+Shift+Z, Delete/Backspace

### Build Validation
```bash
npx tsc --noEmit          # Type checking
npm run build             # Production build
npm run preview           # Verify built output
```
