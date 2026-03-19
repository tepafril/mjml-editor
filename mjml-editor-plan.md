# MJML Editor — Full Development Plan
> Vue 3 + TailwindCSS + Pinia | Craft.js-inspired UX | MJML-native output

---

## 1. Project Philosophy

- **MJML is the single source of truth** — the internal state tree maps 1:1 to MJML nodes, never HTML
- **Live iframe preview** — the canvas IS the rendered MJML output (no dual-reality problem)
- **Craft.js-inspired interaction** — smooth drag-and-drop with animation, inline selection, contextual panels
- **No black boxes** — every component is a plain JSON node; serialization/deserialization is trivial

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        App Shell                                │
│  ┌──────────────┐  ┌─────────────────────────┐  ┌───────────┐  │
│  │  Left Panel  │  │       Canvas            │  │ Right     │  │
│  │              │  │  (iframe live preview)  │  │ Panel     │  │
│  │ - Layers     │  │                         │  │           │  │
│  │ - Components │  │  ← MJML rendered HTML → │  │ - Props   │  │
│  │   Library    │  │                         │  │ - Styles  │  │
│  │              │  │  Overlay layer:         │  │ - Spacing │  │
│  │              │  │  - Drop zones           │  │           │  │
│  │              │  │  - Selection highlight  │  │           │  │
│  │              │  │  - Drag ghost           │  │           │  │
│  └──────────────┘  └─────────────────────────┘  └───────────┘  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Toolbar: Undo/Redo | Preview toggle | Import/Export     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Folder Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── AppShell.vue              # Root layout
│   │   ├── Toolbar.vue               # Top bar (undo, redo, preview, export)
│   │   ├── LeftPanel.vue             # Tab container: Layers + Components
│   │   ├── RightPanel.vue            # Tab container: Props + Styles
│   │   └── Canvas.vue                # iframe + overlay manager
│   │
│   ├── canvas/
│   │   ├── CanvasIframe.vue          # Sandboxed iframe, receives compiled HTML
│   │   ├── OverlayLayer.vue          # Transparent layer for drop zones & selection
│   │   ├── SelectionBox.vue          # Blue outline + resize handles
│   │   ├── DropZoneIndicator.vue     # Animated insertion line
│   │   └── DragGhost.vue             # Floating drag preview
│   │
│   ├── panels/
│   │   ├── ComponentLibrary.vue      # Draggable component tiles
│   │   ├── LayerTree.vue             # Tree view of node hierarchy
│   │   ├── PropsPanel.vue            # Dynamic form per selected node type
│   │   ├── StylePanel.vue            # Padding, colors, size, alignment
│   │   └── SpacingControl.vue        # Visual padding/margin box (like DevTools)
│   │
│   ├── nodes/                        # One file per MJML component
│   │   ├── MjBody.vue
│   │   ├── MjSection.vue
│   │   ├── MjColumn.vue
│   │   ├── MjText.vue
│   │   ├── MjHeading.vue             # Custom wrapper → mj-text with font-size
│   │   ├── MjButton.vue
│   │   ├── MjImage.vue
│   │   ├── MjDivider.vue
│   │   ├── MjSpacer.vue
│   │   └── MjAvatar.vue              # Custom → mj-image styled as circle
│   │
│   └── ui/                           # Generic UI primitives
│       ├── ColorPicker.vue
│       ├── UnitInput.vue             # e.g. "24px", "100%", "auto"
│       ├── AlignmentToggle.vue
│       ├── SizeInput.vue
│       └── IconButton.vue
│
├── stores/
│   ├── editor.store.ts               # Main editor state + actions
│   ├── history.store.ts              # Undo/redo stack
│   ├── preview.store.ts              # Preview mode (desktop/mobile/mjml)
│   └── drag.store.ts                 # Drag state machine
│
├── composables/
│   ├── useDragDrop.ts                # Core DnD logic (dnd-kit inspired, custom)
│   ├── useNodeSelection.ts           # Click, multi-select, keyboard nav
│   ├── useMjmlCompiler.ts            # Tree → MJML string → HTML via mjml-browser
│   ├── useHistory.ts                 # Snapshot diff & undo/redo
│   ├── useKeyboardShortcuts.ts       # Cmd+Z, Cmd+Shift+Z, Delete, etc.
│   ├── useImportExport.ts            # JSON ↔ MJML string ↔ file
│   └── useOverlaySync.ts            # Sync selection boxes to iframe rects
│
├── types/
│   ├── node.types.ts                 # EditorNode, NodeType, NodeProps
│   ├── mjml.types.ts                 # MJML attribute maps per component
│   └── drag.types.ts                 # DragItem, DropZone, DragState
│
├── utils/
│   ├── treeUtils.ts                  # insert, remove, move, flatten, findById
│   ├── mjmlSerializer.ts             # EditorNode[] → MJML XML string
│   ├── mjmlDeserializer.ts           # MJML XML string → EditorNode[]
│   └── defaultProps.ts               # Default attribute map per node type
│
└── main.ts
```

---

## 4. Core Data Model

### 4.1 EditorNode

```typescript
// types/node.types.ts

export type NodeType =
  | 'mj-body'
  | 'mj-section'
  | 'mj-column'
  | 'mj-text'
  | 'mj-heading'      // pseudo-component → compiles to mj-text
  | 'mj-button'
  | 'mj-image'
  | 'mj-divider'
  | 'mj-spacer'
  | 'mj-avatar';      // pseudo-component → compiles to mj-image

export interface EditorNode {
  id: string;                        // nanoid()
  type: NodeType;
  props: Record<string, string>;     // MJML attributes (font-size, color, etc.)
  content?: string;                  // inner text for mj-text, mj-button, etc.
  children: EditorNode[];
  locked?: boolean;                  // prevent selection/editing
  hidden?: boolean;                  // skip rendering
  label?: string;                    // display name in layer panel
}
```

### 4.2 Node Props per Type

```typescript
// types/mjml.types.ts

export const NODE_DEFAULT_PROPS: Record<NodeType, Record<string, string>> = {
  'mj-body': {
    'background-color': '#ffffff',
    width: '600px',
  },
  'mj-section': {
    'padding': '20px 0',
    'background-color': '',
    'text-align': 'left',
  },
  'mj-column': {
    'padding': '0px',
    'background-color': '',
    'vertical-align': 'top',
  },
  'mj-text': {
    'font-size': '14px',
    'color': '#000000',
    'font-family': 'Arial, sans-serif',
    'line-height': '1.5',
    'padding': '10px 25px',
    'align': 'left',
  },
  'mj-heading': {
    'font-size': '24px',
    'color': '#000000',
    'font-weight': 'bold',
    'font-family': 'Arial, sans-serif',
    'padding': '10px 25px',
    'align': 'left',
  },
  'mj-button': {
    'background-color': '#4A90D9',
    'color': '#ffffff',
    'font-size': '14px',
    'padding': '10px 25px',
    'border-radius': '4px',
    'align': 'center',
    'href': '#',
    'width': '',
  },
  'mj-image': {
    'src': 'https://via.placeholder.com/600x200',
    'width': '600px',
    'alt': '',
    'align': 'center',
    'padding': '10px 25px',
  },
  'mj-divider': {
    'border-color': '#cccccc',
    'border-style': 'solid',
    'border-width': '1px',
    'padding': '10px 25px',
  },
  'mj-spacer': {
    height: '20px',
  },
  'mj-avatar': {
    'src': 'https://via.placeholder.com/80',
    'width': '80px',
    'border-radius': '50%',
    'align': 'center',
    'padding': '10px 25px',
  },
};
```

---

## 5. State Management (Pinia)

### 5.1 Editor Store

```typescript
// stores/editor.store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { EditorNode } from '@/types/node.types'
import { useHistory } from '@/composables/useHistory'
import { treeUtils } from '@/utils/treeUtils'
import { nanoid } from 'nanoid'

export const useEditorStore = defineStore('editor', () => {
  // --- State ---
  const tree = ref<EditorNode>(createDefaultTree())
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)

  // --- History integration ---
  const { snapshot, undo, redo, canUndo, canRedo } = useHistory(tree)

  // --- Computed ---
  const selectedNode = computed(() =>
    selectedId.value ? treeUtils.findById(tree.value, selectedId.value) : null
  )

  // --- Actions ---
  function selectNode(id: string | null) {
    selectedId.value = id
  }

  function updateNodeProps(id: string, props: Record<string, string>) {
    snapshot() // save to history before mutation
    treeUtils.updateProps(tree.value, id, props)
  }

  function updateNodeContent(id: string, content: string) {
    snapshot()
    treeUtils.updateContent(tree.value, id, content)
  }

  function insertNode(node: EditorNode, parentId: string, index: number) {
    snapshot()
    treeUtils.insert(tree.value, node, parentId, index)
  }

  function moveNode(nodeId: string, targetParentId: string, index: number) {
    snapshot()
    treeUtils.move(tree.value, nodeId, targetParentId, index)
  }

  function removeNode(id: string) {
    snapshot()
    treeUtils.remove(tree.value, id)
    if (selectedId.value === id) selectedId.value = null
  }

  function duplicateNode(id: string) {
    snapshot()
    treeUtils.duplicate(tree.value, id)
  }

  function loadTree(newTree: EditorNode) {
    snapshot()
    tree.value = newTree
  }

  return {
    tree, selectedId, hoveredId, selectedNode,
    selectNode, updateNodeProps, updateNodeContent,
    insertNode, moveNode, removeNode, duplicateNode, loadTree,
    undo, redo, canUndo, canRedo,
  }
})
```

### 5.2 History Store

```typescript
// stores/history.store.ts
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', () => {
  const past = ref<string[]>([])     // JSON snapshots
  const future = ref<string[]>([])

  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)

  function push(snapshot: string) {
    past.value.push(snapshot)
    future.value = []               // clear redo on new action
    if (past.value.length > 100) past.value.shift()  // cap at 100
  }

  function popUndo(): string | null {
    return past.value.pop() ?? null
  }

  function pushRedo(snapshot: string) {
    future.value.push(snapshot)
  }

  function popRedo(): string | null {
    return future.value.pop() ?? null
  }

  return { past, future, canUndo, canRedo, push, popUndo, pushRedo, popRedo }
})
```

### 5.3 Drag Store

```typescript
// stores/drag.store.ts
export const useDragStore = defineStore('drag', () => {
  const isDragging = ref(false)
  const dragSource = ref<{ nodeId?: string; nodeType?: string } | null>(null)
  const dragOverNodeId = ref<string | null>(null)
  const dropIndex = ref<number>(0)
  const dropParentId = ref<string | null>(null)
  const ghostPosition = ref({ x: 0, y: 0 })

  function startDrag(source: { nodeId?: string; nodeType?: string }) {
    isDragging.value = true
    dragSource.value = source
  }

  function endDrag() {
    isDragging.value = false
    dragSource.value = null
    dragOverNodeId.value = null
    dropParentId.value = null
  }

  return {
    isDragging, dragSource, dragOverNodeId,
    dropIndex, dropParentId, ghostPosition,
    startDrag, endDrag,
  }
})
```

---

## 6. Drag & Drop System (Craft.js-inspired)

This is the heart of the editor. We'll build a **custom DnD system** — no library, giving full animation control.

### 6.1 Two Drag Sources

1. **Component Library** → dragging a new component type onto the canvas
2. **Existing node** → reordering within or across parents

### 6.2 useDragDrop Composable

```typescript
// composables/useDragDrop.ts
export function useDragDrop() {
  const dragStore = useDragStore()
  const editorStore = useEditorStore()

  // Called on the draggable element (library tile or canvas node)
  function onDragStart(e: DragEvent, source: DragSource) {
    dragStore.startDrag(source)
    // Set transparent drag image to use our custom ghost
    const ghost = document.createElement('div')
    ghost.style.opacity = '0'
    document.body.appendChild(ghost)
    e.dataTransfer?.setDragImage(ghost, 0, 0)
    setTimeout(() => document.body.removeChild(ghost), 0)
  }

  // Called on valid drop zone containers
  function onDragEnter(e: DragEvent, parentId: string) {
    e.preventDefault()
    dragStore.dragOverNodeId = parentId
  }

  // Called to calculate drop index from mouse Y position
  function onDragOver(e: DragEvent, parentId: string, children: EditorNode[]) {
    e.preventDefault()
    dragStore.ghostPosition = { x: e.clientX, y: e.clientY }
    dragStore.dropParentId = parentId
    dragStore.dropIndex = calculateDropIndex(e, children)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    const { dragSource, dropParentId, dropIndex } = dragStore

    if (!dropParentId) return

    if (dragSource?.nodeType) {
      // New node from library
      const newNode = createNode(dragSource.nodeType as NodeType)
      editorStore.insertNode(newNode, dropParentId, dropIndex)
      editorStore.selectNode(newNode.id)
    } else if (dragSource?.nodeId) {
      // Move existing node
      editorStore.moveNode(dragSource.nodeId, dropParentId, dropIndex)
    }

    dragStore.endDrag()
  }

  function onDragEnd() {
    dragStore.endDrag()
  }

  return { onDragStart, onDragEnter, onDragOver, onDrop, onDragEnd }
}
```

### 6.3 Drop Index Calculation

```typescript
function calculateDropIndex(e: DragEvent, children: EditorNode[]): number {
  // Get bounding rects of all sibling children in the drop container
  // Compare mouse Y to midpoint of each child
  // Return the insertion index
  const childEls = document.querySelectorAll(`[data-node-id]`)
  // ... iterate, compare midpoints, return index
}
```

### 6.4 Animated Drop Indicator

```vue
<!-- canvas/DropZoneIndicator.vue -->
<template>
  <Transition name="drop-line">
    <div v-if="visible" class="drop-indicator" :style="{ top: `${y}px` }" />
  </Transition>
</template>

<style>
.drop-indicator {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: #4F46E5;
  border-radius: 2px;
  pointer-events: none;
  z-index: 100;
}
.drop-indicator::before {
  content: '';
  position: absolute;
  left: -4px; top: -3px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #4F46E5;
}
.drop-line-enter-active { transition: opacity 0.1s ease; }
.drop-line-enter-from  { opacity: 0; }
</style>
```

### 6.5 Drag Ghost Component

```vue
<!-- canvas/DragGhost.vue -->
<template>
  <Teleport to="body">
    <Transition name="ghost-fade">
      <div
        v-if="dragStore.isDragging"
        class="drag-ghost"
        :style="{ transform: `translate(${pos.x + 12}px, ${pos.y + 12}px)` }"
      >
        <component :is="ghostIcon" class="w-4 h-4" />
        <span>{{ label }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.drag-ghost {
  position: fixed;
  top: 0; left: 0;
  background: #4F46E5;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(79,70,229,0.4);
  transition: transform 0.05s linear;
}
</style>
```

---

## 7. Canvas & Preview System

### 7.1 Canvas Strategy

The canvas uses a **split approach**:
- An `<iframe>` holds the live compiled MJML HTML
- A transparent **overlay div** sits on top, handling all interaction (clicks, drop zones, hover)
- Selection boxes are drawn on the overlay by reading `getBoundingClientRect()` from inside the iframe

```vue
<!-- canvas/Canvas.vue -->
<template>
  <div class="canvas-wrapper relative" ref="canvasRef">
    <CanvasIframe :html="compiledHtml" @ready="onIframeReady" />
    <OverlayLayer
      :iframeDoc="iframeDoc"
      :selectedId="editorStore.selectedId"
      :hoveredId="editorStore.hoveredId"
      @select="editorStore.selectNode"
      @drop="handleDrop"
    />
    <DropZoneIndicator v-bind="dropIndicatorProps" />
    <DragGhost />
  </div>
</template>
```

### 7.2 MJML Compiler Composable

```typescript
// composables/useMjmlCompiler.ts
import mjml2html from 'mjml-browser'

export function useMjmlCompiler() {
  const editorStore = useEditorStore()
  const previewStore = usePreviewStore()

  const compiledHtml = computed(() => {
    const mjmlString = serializeToMjml(editorStore.tree)
    try {
      const { html, errors } = mjml2html(mjmlString, { validationLevel: 'soft' })
      return html
    } catch (e) {
      return '<p>Render error</p>'
    }
  })

  return { compiledHtml }
}
```

### 7.3 Preview Modes

```typescript
// stores/preview.store.ts
export const usePreviewStore = defineStore('preview', () => {
  type PreviewMode = 'desktop' | 'mobile' | 'mjml-source'
  const mode = ref<PreviewMode>('desktop')

  const canvasWidth = computed(() => ({
    desktop: '100%',
    mobile: '375px',
    'mjml-source': '100%',
  }[mode.value]))

  return { mode, canvasWidth }
})
```

---

## 8. MJML Serializer

```typescript
// utils/mjmlSerializer.ts

export function serializeToMjml(node: EditorNode, indent = 0): string {
  const pad = '  '.repeat(indent)

  // Map pseudo-types
  const tagName = node.type === 'mj-heading' ? 'mj-text'
    : node.type === 'mj-avatar' ? 'mj-image'
    : node.type

  // Build attributes string
  const attrs = Object.entries(node.props)
    .filter(([, v]) => v !== '')
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')

  const openTag = `<${tagName}${attrs ? ' ' + attrs : ''}>`
  const closeTag = `</${tagName}>`

  if (node.children.length > 0) {
    const childrenStr = node.children
      .filter(c => !c.hidden)
      .map(c => serializeToMjml(c, indent + 1))
      .join('\n')
    return `${pad}${openTag}\n${childrenStr}\n${pad}${closeTag}`
  }

  if (node.content) {
    return `${pad}${openTag}${node.content}${closeTag}`
  }

  return `${pad}<${tagName}${attrs ? ' ' + attrs : ''} />`
}

export function buildFullMjml(root: EditorNode): string {
  return `<mjml>\n${serializeToMjml(root, 1)}\n</mjml>`
}
```

---

## 9. Right Panel — Props & Style Controls

The right panel renders **dynamically** based on the selected node type.

### 9.1 PropsPanel Router

```vue
<!-- panels/PropsPanel.vue -->
<template>
  <div v-if="selectedNode">
    <PanelSection title="Content" v-if="hasContent">
      <ContentEditor :node="selectedNode" />
    </PanelSection>

    <PanelSection title="Layout">
      <AlignmentToggle :node="selectedNode" />
      <SizeInputs :node="selectedNode" />
    </PanelSection>

    <PanelSection title="Spacing">
      <SpacingControl :node="selectedNode" />
    </PanelSection>

    <PanelSection title="Typography" v-if="hasText">
      <FontControls :node="selectedNode" />
    </PanelSection>

    <PanelSection title="Colors">
      <ColorPicker label="Text Color" prop="color" :node="selectedNode" />
      <ColorPicker label="Background" prop="background-color" :node="selectedNode" />
    </PanelSection>
  </div>
  <EmptyState v-else message="Select an element to edit" />
</template>
```

### 9.2 SpacingControl (CSS DevTools inspired)

```vue
<!-- panels/SpacingControl.vue -->
<!-- Visual box: Margin → Border → Padding → Content -->
<template>
  <div class="spacing-box">
    <div class="spacing-label">PADDING</div>
    <div class="spacing-grid">
      <!-- Top -->
      <UnitInput v-model="paddingTop" class="col-start-2" @update="syncPadding" />
      <!-- Left, [content], Right -->
      <UnitInput v-model="paddingLeft" @update="syncPadding" />
      <div class="spacing-center">-</div>
      <UnitInput v-model="paddingRight" @update="syncPadding" />
      <!-- Bottom -->
      <UnitInput v-model="paddingBottom" class="col-start-2" @update="syncPadding" />
    </div>
  </div>
</template>
```

---

## 10. Toolbar — Undo, Redo, Import, Export, Preview

```vue
<!-- editor/Toolbar.vue -->
<template>
  <div class="toolbar flex items-center gap-2 px-4 h-12 border-b bg-white">
    <!-- Logo -->
    <span class="font-bold text-indigo-600 mr-4">MailCraft</span>

    <!-- History -->
    <IconButton @click="editorStore.undo" :disabled="!editorStore.canUndo" title="Undo (⌘Z)">
      <UndoIcon />
    </IconButton>
    <IconButton @click="editorStore.redo" :disabled="!editorStore.canRedo" title="Redo (⌘⇧Z)">
      <RedoIcon />
    </IconButton>

    <Divider />

    <!-- Preview modes -->
    <SegmentedControl
      v-model="previewStore.mode"
      :options="[
        { value: 'desktop', icon: 'Monitor' },
        { value: 'mobile', icon: 'Smartphone' },
        { value: 'mjml-source', icon: 'Code' },
      ]"
    />

    <div class="flex-1" />

    <!-- Import / Export -->
    <Button variant="ghost" @click="importJson">Import JSON</Button>
    <Button variant="ghost" @click="exportMjml">Export MJML</Button>
    <Button variant="primary" @click="exportHtml">Export HTML</Button>
  </div>
</template>
```

---

## 11. Component Library Panel

```vue
<!-- panels/ComponentLibrary.vue -->
<template>
  <div class="p-3">
    <input v-model="search" placeholder="Search components..." class="search-input" />

    <div class="component-grid mt-3">
      <ComponentTile
        v-for="comp in filteredComponents"
        :key="comp.type"
        :component="comp"
        draggable="true"
        @dragstart="onDragStart($event, { nodeType: comp.type })"
      />
    </div>
  </div>
</template>

<script setup>
const COMPONENTS = [
  { type: 'mj-heading',  label: 'Heading',   icon: 'Heading',    group: 'Content' },
  { type: 'mj-text',    label: 'Text',      icon: 'Type',       group: 'Content' },
  { type: 'mj-button',  label: 'Button',    icon: 'MousePointer',group: 'Content' },
  { type: 'mj-image',   label: 'Image',     icon: 'Image',      group: 'Media' },
  { type: 'mj-avatar',  label: 'Avatar',    icon: 'User',       group: 'Media' },
  { type: 'mj-divider', label: 'Divider',   icon: 'Minus',      group: 'Layout' },
  { type: 'mj-spacer',  label: 'Spacer',    icon: 'ChevronsUpDown', group: 'Layout' },
  { type: 'mj-section', label: 'Section',   icon: 'Rows',       group: 'Layout' },
  { type: 'mj-column',  label: 'Column',    icon: 'Columns',    group: 'Layout' },
]
</script>
```

---

## 12. Layer Tree Panel

```vue
<!-- panels/LayerTree.vue -->
<!-- Recursive tree with expand/collapse, drag handle, visibility toggle -->
<template>
  <div class="layer-tree">
    <LayerItem
      v-for="node in editorStore.tree.children"
      :key="node.id"
      :node="node"
      :depth="0"
    />
  </div>
</template>

<!-- LayerItem.vue - recursive -->
<template>
  <div
    class="layer-item"
    :class="{ selected: isSelected, hovered: isHovered }"
    :style="{ paddingLeft: `${depth * 12 + 8}px` }"
    @click="editorStore.selectNode(node.id)"
  >
    <ChevronIcon v-if="hasChildren" :open="expanded" @click.stop="toggle" />
    <NodeTypeIcon :type="node.type" />
    <span class="label">{{ node.label || node.type }}</span>
    <div class="layer-actions">
      <EyeIcon @click.stop="toggleVisibility" />
      <LockIcon @click.stop="toggleLock" />
    </div>
  </div>
  <Transition name="layer-expand">
    <div v-if="expanded && hasChildren">
      <LayerItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
      />
    </div>
  </Transition>
</template>
```

---

## 13. Keyboard Shortcuts

```typescript
// composables/useKeyboardShortcuts.ts
export function useKeyboardShortcuts() {
  const editor = useEditorStore()

  const handlers: Record<string, () => void> = {
    'meta+z':       () => editor.undo(),
    'meta+shift+z': () => editor.redo(),
    'ctrl+z':       () => editor.undo(),
    'ctrl+shift+z': () => editor.redo(),
    'delete':       () => editor.selectedId && editor.removeNode(editor.selectedId),
    'backspace':    () => editor.selectedId && editor.removeNode(editor.selectedId),
    'meta+d':       () => editor.selectedId && editor.duplicateNode(editor.selectedId),
    'escape':       () => editor.selectNode(null),
    'meta+shift+e': () => exportMjml(),
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKey)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
  })
}
```

---

## 14. Import / Export

```typescript
// composables/useImportExport.ts
export function useImportExport() {
  const editor = useEditorStore()

  function exportJson() {
    const json = JSON.stringify(editor.tree, null, 2)
    downloadFile(json, 'template.json', 'application/json')
  }

  function exportMjml() {
    const mjml = buildFullMjml(editor.tree)
    downloadFile(mjml, 'template.mjml', 'text/plain')
  }

  function exportHtml() {
    const mjml = buildFullMjml(editor.tree)
    const { html } = mjml2html(mjml)
    downloadFile(html, 'email.html', 'text/html')
  }

  function importJson(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const tree = JSON.parse(e.target?.result as string)
      editor.loadTree(tree)
    }
    reader.readAsText(file)
  }

  function importMjml(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const mjmlString = e.target?.result as string
      const tree = deserializeFromMjml(mjmlString)
      editor.loadTree(tree)
    }
    reader.readAsText(file)
  }

  return { exportJson, exportMjml, exportHtml, importJson, importMjml }
}
```

---

## 15. Node Nesting Rules

| Parent         | Allowed Children                                      |
|----------------|-------------------------------------------------------|
| `mj-body`      | `mj-section`                                         |
| `mj-section`   | `mj-column`                                          |
| `mj-column`    | `mj-text`, `mj-heading`, `mj-button`, `mj-image`, `mj-avatar`, `mj-divider`, `mj-spacer` |
| All leaf nodes | No children                                          |

These rules are enforced at drop time — invalid drop targets are visually dimmed during drag.

---

## 16. Development Phases

### Phase 1 — Foundation (Week 1–2)
- [ ] Scaffold Vue 3 + Tailwind + Pinia project
- [ ] Define all types (`EditorNode`, `NodeType`, props maps)
- [ ] Build `treeUtils.ts` with full CRUD + tests
- [ ] Build `mjmlSerializer.ts` + round-trip test
- [ ] Wire up `editor.store` + `history.store`
- [ ] Basic 3-panel layout (AppShell)

### Phase 2 — Canvas & Preview (Week 3)
- [ ] CanvasIframe with `mjml-browser` compilation
- [ ] Desktop / Mobile / Source preview toggle
- [ ] Overlay layer with click-to-select
- [ ] SelectionBox drawn from iframe rects
- [ ] Right panel with static props form

### Phase 3 — Drag & Drop (Week 4–5)
- [ ] ComponentLibrary with drag handles
- [ ] useDragDrop composable
- [ ] DragGhost component
- [ ] DropZoneIndicator with animation
- [ ] Nesting rule enforcement
- [ ] Move existing nodes between parents

### Phase 4 — Right Panel Controls (Week 6)
- [ ] SpacingControl (visual padding box)
- [ ] ColorPicker (with hex, opacity)
- [ ] AlignmentToggle
- [ ] UnitInput (px / % / auto)
- [ ] FontControls (size, weight, family)
- [ ] Per-component prop panels

### Phase 5 — Full Feature Polish (Week 7–8)
- [ ] Undo/Redo with 100-step history
- [ ] LayerTree with expand/collapse/visibility/lock
- [ ] Keyboard shortcuts
- [ ] Import/Export (JSON, MJML, HTML)
- [ ] Duplicate node
- [ ] Inline content editing (double-click to edit text)
- [ ] Empty state + onboarding
- [ ] Responsive at smaller viewports

### Phase 6 — QA & Hardening (Week 9)
- [ ] Cross-client MJML output testing (Litmus/Email on Acid)
- [ ] Edge case: deeply nested undo
- [ ] Performance: debounce MJML compilation
- [ ] Accessibility: keyboard nav in panels
- [ ] Unit tests for serializer, treeUtils, history

---

## 17. Key Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4",
    "pinia": "^2.1",
    "mjml-browser": "^4.14",
    "nanoid": "^5",
    "lucide-vue-next": "latest"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-vue": "^5",
    "tailwindcss": "^3",
    "typescript": "^5",
    "vitest": "^1"
  }
}
```

> **Note:** `mjml-browser` bundles MJML for client-side use. For production, consider a small backend `/api/compile` endpoint to keep bundle size down and get server-side validation.

---

## 18. UX Details Inspired by Craft.js

| Craft.js Feature | Our Implementation |
|---|---|
| Blue selection outline | `SelectionBox.vue` — absolutely positioned overlay rect |
| "Drag to reorder" ghost | `DragGhost.vue` — custom floating label follows cursor |
| Insertion line indicator | `DropZoneIndicator.vue` — indigo line with dot cap |
| Right panel reactive to selection | `PropsPanel.vue` — `computed(() => selectedNode)` |
| Layer panel hover sync | `hoveredId` shared between LayerTree ↔ Canvas overlay |
| Click outside to deselect | `Canvas.vue` — click on canvas background clears selection |
| Smooth transitions | Vue `<Transition>` + Tailwind animation classes throughout |
