<script setup lang="ts">
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const options = [
  { value: 'left', icon: AlignLeft },
  { value: 'center', icon: AlignCenter },
  { value: 'right', icon: AlignRight },
]
</script>

<template>
  <div class="flex border border-gray-200 rounded overflow-hidden">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="flex-1 flex items-center justify-center py-1.5 transition-colors"
      :class="modelValue === opt.value ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'"
      @click="emit('update:modelValue', opt.value)"
    >
      <component :is="opt.icon" class="w-3.5 h-3.5" />
    </button>
  </div>
</template>
