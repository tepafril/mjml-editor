import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHistoryStore = defineStore('history', () => {
  const past = ref<string[]>([])
  const future = ref<string[]>([])

  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)

  function push(snapshot: string) {
    past.value.push(snapshot)
    future.value = []
    if (past.value.length > 100) past.value.shift()
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

  function clear() {
    past.value = []
    future.value = []
  }

  return { past, future, canUndo, canRedo, push, popUndo, pushRedo, popRedo, clear }
})
