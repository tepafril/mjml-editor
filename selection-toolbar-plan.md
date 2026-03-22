# Selection Toolbar — Action Buttons Plan

## Context

The SelectionBox overlay on selected nodes currently shows a drag handle + label. The user wants quick-action buttons added to the toolbar for common operations, removing the need to right-click or use keyboard shortcuts.

## Buttons to Add

| # | Action    | Icon           | Behavior                                           |
|---|-----------|----------------|-----------------------------------------------------|
| 1 | Move Up   | `ChevronUp`    | Swap node with previous sibling in parent           |
| 2 | Move Down | `ChevronDown`  | Swap node with next sibling in parent               |
| 3 | Duplicate | `Copy`         | Clone node and insert after current (existing action) |
| 4 | Delete    | `Trash2`       | Remove node from tree (existing action)             |

Buttons appear **to the right of the label** in the top toolbar bar. Disabled state (dimmed) when action is not possible (e.g., Move Up on first child, Move Down on last child).

## Files to Modify

### `src/components/canvas/SelectionBox.vue`

- Add 4 new icon imports from `lucide-vue-next`: `ChevronUp`, `ChevronDown`, `Copy`, `Trash2`
- Add new props: `canMoveUp`, `canMoveDown` (booleans for disabled state)
- Add new emits: `moveUp`, `moveDown`, `duplicate`, `delete`
- Add 4 buttons after the label `<div>`, each with:
  - `pointer-events-auto` (same as drag handle)
  - `@click.stop` to prevent selecting/deselecting
  - Shared styling: `bg-indigo-600 text-white hover:bg-indigo-700`
  - Disabled styling: `opacity-40 cursor-not-allowed` when not applicable
  - Icon size: `w-3 h-3` (matches drag handle)

### `src/components/editor/Canvas.vue`

- Add computed `canMoveUp` / `canMoveDown` — find selected node's index in parent's children array
- Add handler functions:
  - `onMoveUp`: call `editorStore.moveNode(id, parentId, currentIndex - 1)`
  - `onMoveDown`: call `editorStore.moveNode(id, parentId, currentIndex + 1)` — but since `treeUtils.move` removes first then inserts, the effective index after removal shifts, so use `currentIndex + 2` for "move down" (remove at `i`, insert at `i+1` in the post-removal array = original index `i+2`)
  - `onDuplicate`: call `editorStore.duplicateNode(id)`
  - `onDelete`: call `editorStore.removeNode(id)`
- Pass new props/events to the `<SelectionBox>` component
- Wire FLIP animation (`captureBeforeMove`) before move up/down calls for smooth transitions

### No store changes needed

`editor.store.ts` already has `moveNode`, `removeNode`, `duplicateNode`.

## Move Index Logic

Given a node at index `i` in its parent's children array:

- **Move Up**: `moveNode(nodeId, parentId, i - 1)` — `treeUtils.move` removes first (shifting indices), then inserts at `i - 1`
- **Move Down**: `moveNode(nodeId, parentId, i + 2)` — after removal, the node that was at `i+1` shifts to `i`, so inserting at `i+1` post-removal equals original `i+2` pre-removal. Actually, `treeUtils.move` calls `remove` then `insert`. After remove, the array has one fewer element. The node originally at `i+1` is now at `i`. To place our node after it, we insert at `i+1`. But `move` takes the insert index in the post-removal array. So: `move(nodeId, parentId, i + 1)` where `i` is the **original** index. Wait — `move` removes first, so post-removal the target parent's children shifted. If same parent: original index `i`, after remove the sibling that was at `i+1` is now at `i`. To go after it, insert at `i+1`.

Simplified: just use index lookup after removal (what `treeUtils.move` does internally).

Actually simpler approach: use `findParent` + index lookup, then call `moveNode(id, parent.id, newIndex)`:
- Move up: `moveNode(id, parent.id, index - 1)`
- Move down: `moveNode(id, parent.id, index + 1)`

Since `treeUtils.move` does `remove` then `insert`:
- Move up (index 2 -> 1): remove from 2, array shifts, insert at 1. Correct.
- Move down (index 1 -> 2): remove from 1, the item at 2 shifts to 1, insert at 2. Node ends up at position 2. Correct.

So just `index - 1` and `index + 1` works.

## Verification

1. `npm run build` — no errors
2. Select a node, verify 4 buttons appear in toolbar
3. Move Up on first child — button should be disabled
4. Move Down on last child — button should be disabled
5. Duplicate — new node appears after current
6. Delete — node removed, selection cleared
7. Move Up/Down — node slides with FLIP animation
