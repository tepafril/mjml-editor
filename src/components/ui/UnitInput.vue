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
    <label v-if="label" class="text-xs text-gray-500">{{ label }}</label>
    <input
      v-model="displayValue"
      type="text"
      :placeholder="placeholder"
      class="w-full px-2 py-1 text-xs border border-gray-200 rounded bg-white
             focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
    />
  </div>
</template>
