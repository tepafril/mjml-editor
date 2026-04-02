import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Command } from '@/features/editor-tree/commands'

export const useHistoryStore = defineStore('history', () => {
  const past = ref<Command[]>([])
  const future = ref<Command[]>([])

  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)

  function execute(command: Command) {
    command.execute()
    past.value.push(command)
    future.value = []
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

  function clear() {
    past.value = []
    future.value = []
  }

  return { past, future, canUndo, canRedo, execute, undo, redo, clear }
})
