<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const colorValue = computed({
  get: () => props.modelValue || '#000000',
  set: (val: string) => emit('update:modelValue', val),
})

const textValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-xs text-gray-500">{{ label }}</label>
    <div class="flex items-center gap-2">
      <input
        type="color"
        v-model="colorValue"
        class="w-7 h-7 rounded border border-gray-200 cursor-pointer p-0"
      />
      <input
        type="text"
        v-model="textValue"
        class="flex-1 px-2 py-1 text-xs border border-gray-200 rounded bg-white
               focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
        placeholder="#000000"
      />
    </div>
  </div>
</template>
