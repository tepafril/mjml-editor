<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const displayValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-xs text-gray-500">{{ label ?? 'CSS Class' }}</label>
    <input
      v-model="displayValue"
      type="text"
      :placeholder="placeholder ?? 'e.g. my-class'"
      class="w-full px-2 py-1 text-xs border border-gray-200 rounded bg-white
             focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
    />
    <p class="text-[10px] text-gray-400">Class name added to the HTML element</p>
  </div>
</template>
