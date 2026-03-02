<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'
const { totalChunks } = useChunkStats()

const store = useChunksStore()

// True when every bucket is selected
const isAllSelected = computed(() => {
  if (!store.data) return false
  const allBuckets = store.data.groups.flatMap(g => g.buckets)
  return allBuckets.length > 0 && allBuckets.every(b => store.isSelected(b.date))
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-2 px-6 py-2 border-b bg-white border-gray-400 dark:bg-zinc-950 dark:border-gray-800">

    <div class="flex items-center gap-2">

      <div class="flex items-center gap-3 px-3 py-1.5 border border-gray-400 dark:border-gray-700 rounded">
        <UCheckbox
          :model-value="isAllSelected"
          @update:model-value="store.toggleSelectAll()"
        />
        <span class="text-xs text-gray-900 dark:text-gray-400">All</span>
        <div class="w-px h-3 bg-gray-400 dark:bg-gray-700" />
        <span class="text-xs text-gray-900 dark:text-gray-400">{{ store.selectedCount }} selected</span>
      </div>

      <button
        :disabled="store.selectedCount === 0"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-opacity
          border-emerald-500 text-emerald-600 bg-emerald-50
          dark:border-emerald-500 dark:text-emerald-400 dark:bg-emerald-950
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-emerald-100 dark:hover:bg-emerald-900"
      >
        <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5" />
        Download ({{ store.selectedCount }})
      </button>

      <button
        :disabled="store.selectedCount === 0"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-opacity
          border-red-400 text-red-500 bg-red-50
          dark:border-red-500 dark:text-red-400 dark:bg-red-950
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-red-100 dark:hover:bg-red-900"
      >
        <UIcon name="i-heroicons-trash" class="w-3.5 h-3.5" />
        Delete ({{ store.selectedCount }})
      </button>
    </div>

    <div v-if="store.data" class="flex items-center gap-3 text-xs text-gray-900 dark:text-gray-500 w-full md:w-auto">
      <span>24h window</span>
      <div class="w-px h-3 bg-gray-200 dark:bg-gray-700" />
      <span>{{ totalChunks }} chunks</span>
    </div>

  </div>
</template>