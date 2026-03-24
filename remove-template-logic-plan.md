# Plan: Remove Template Logic Feature

## Context

The template logic feature (variables, loops, conditionals) was added but may not be needed. This plan covers how to fully remove it.

---

## Files to Delete

| File | Description |
|------|-------------|
| `src/config/templateVariables.ts` | Variable definitions |
| `src/components/panels/VariablePicker.vue` | Variable picker dropdown |
| `src/utils/templateExporter.ts` | HTML export with template logic injection |

---

## Files to Modify

### 1. `src/types/node.types.ts`
- Remove the `TemplateLogic` interface
- Remove `templateLogic?: TemplateLogic` field from `EditorNode`

### 2. `src/utils/treeUtils.ts`
- In `deepClone()`, remove the `templateLogic` line:
  ```diff
  - templateLogic: node.templateLogic ? { ...node.templateLogic } : undefined,
  ```

### 3. `src/stores/editor.store.ts`
- Remove `import type { TemplateLogic }` from imports
- Remove the `updateNodeTemplateLogic()` function
- Remove `updateNodeTemplateLogic` from the return object

### 4. `src/components/panels/PropsPanel.vue`
- Remove imports: `Repeat`, `GitBranch`, `Braces` from lucide-vue-next
- Remove `import VariablePicker` from `./VariablePicker.vue`
- Remove `HAS_FOREACH` set
- Remove `insertVariable()` function
- Remove `updateTemplateLogic()` function
- Revert Content label back to plain `<label>` (remove the flex wrapper and VariablePicker)
- Remove the entire `<!-- Template Logic -->` section (foreach/if inputs with amber styling)

### 5. `src/components/panels/LayerItem.vue`
- Remove `Repeat`, `GitBranch` from lucide-vue-next imports
- Remove the two indicator icons (`<Repeat>` and `<GitBranch>`) next to the node label

### 6. `src/composables/useImportExport.ts`
- Remove `import { buildTemplateHtml }` from `@/utils/templateExporter`
- Remove `exportTemplateHtml()` function
- Remove `exportTemplateHtml` from the return object

### 7. `src/components/panels/EmailSettingsPanel.vue`
- Remove `exportTemplateHtml` from the `useImportExport()` destructure
- Remove the "Export Template HTML" button in the Import/Export tab

---

## Verification

1. Type check passes: `npx vue-tsc --noEmit`
2. No references to `templateLogic`, `TemplateLogic`, `templateExporter`, `VariablePicker`, or `templateVariables` remain in `src/`
3. Editor loads, selecting nodes shows properties without template logic section
4. Layer tree renders without loop/condition icons
5. Import/Export tab only shows Import MJML and Export MJML buttons
