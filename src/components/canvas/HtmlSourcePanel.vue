<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

const props = defineProps<{ html: string }>()

const copied = ref(false)

async function copyHtml() {
  await navigator.clipboard.writeText(props.html)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <!-- Toolbar -->
    <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 shrink-0">
      <span class="text-xs font-medium text-gray-500">Compiled HTML</span>
      <button
        @click="copyHtml"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
        :class="copied
          ? 'bg-green-50 text-green-600 border border-green-200'
          : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'"
      >
        <Check v-if="copied" class="w-3.5 h-3.5" />
        <Copy v-else class="w-3.5 h-3.5" />
        {{ copied ? 'Copied!' : 'Copy HTML' }}
      </button>
    </div>

    <!-- Code -->
    <div class="flex-1 overflow-auto p-4">
      <pre class="text-xs font-mono text-gray-700 bg-white p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">{{ html }}</pre>
    </div>
  </div>
</template>
