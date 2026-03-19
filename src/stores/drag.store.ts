import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DragSource } from '@/types/drag.types'

export const useDragStore = defineStore('drag', () => {
  const isDragging = ref(false)
  const dragSource = ref<DragSource | null>(null)
  const dragOverNodeId = ref<string | null>(null)
  const dropIndex = ref(0)
  const dropParentId = ref<string | null>(null)
  const ghostPosition = ref({ x: 0, y: 0 })

  function startDrag(source: DragSource) {
    isDragging.value = true
    dragSource.value = source
  }

  function endDrag() {
    isDragging.value = false
    dragSource.value = null
    dragOverNodeId.value = null
    dropParentId.value = null
    dropIndex.value = 0
  }

  return {
    isDragging, dragSource, dragOverNodeId,
    dropIndex, dropParentId, ghostPosition,
    startDrag, endDrag,
  }
})
