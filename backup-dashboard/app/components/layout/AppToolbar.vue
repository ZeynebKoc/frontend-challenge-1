<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'
const { totalChunks } = useChunkStats()

const store = useChunksStore()
const openDownload = inject<() => Promise<void>>('openDownload')
const openDelete = inject<() => Promise<void>>('openDelete')

const isDownloading = ref(false)
const isDeleting = ref(false)

// True when every bucket is selected
const isAllSelected = computed(() => {
  if (!store.data) return false
  const allBuckets = store.data.groups.flatMap(g => g.buckets)
  return allBuckets.length > 0 && allBuckets.every(b => store.isSelected(b.date))
})

const handleDownloadClick = async () => {
  isDownloading.value = true
  try {
    await openDownload?.()
  } finally {
    isDownloading.value = false
  }
}

const handleDeleteClick = async () => {
  isDeleting.value = true
  try {
    await openDelete?.()
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-2 px-6 py-3 border-b bg-white border-gray-400 dark:bg-zinc-950 dark:border-gray-800">

    <div class="flex flex-wrap items-center gap-2">

      <!-- Select all + selected count + clear selection -->
      <div class="flex items-center gap-3 px-3 py-1.5 border border-gray-400 dark:border-gray-700 rounded">
        <UCheckbox
          :model-value="isAllSelected"
          @update:model-value="store.toggleSelectAll()"
        />
        <span class="text-xs text-gray-900 dark:text-gray-400">All</span>
        <div class="w-px h-3 bg-gray-400 dark:bg-gray-700" />
        <span class="text-xs text-gray-900 dark:text-gray-400">{{ store.selectedCount }} selected</span>
        <div class="w-px h-3 bg-gray-400 dark:bg-gray-700" />
        <!-- Clear selection button -->
        <button
          :disabled="store.selectedCount === 0"
          class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400
            disabled:opacity-30 disabled:cursor-not-allowed
            hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          @click="store.clearSelectedChunks()"
        >
          <UIcon name="i-heroicons-x-mark" class="w-3.5 h-3.5" />
          Clear
        </button>
      </div>

      <!-- Download + Delete — wraps to next line on small screens -->
      <div class="flex items-center gap-2">
        <button
          :disabled="store.selectedCount === 0 || isDownloading"
          class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-opacity
            border-emerald-500 text-emerald-600 bg-emerald-50
            dark:border-emerald-500 dark:text-emerald-400 dark:bg-emerald-950
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-emerald-100 dark:hover:bg-emerald-900"
          @click="handleDownloadClick"
        >
          <UIcon v-if="isDownloading" name="i-heroicons-arrow-path" class="w-3.5 h-3.5 animate-spin" />
          <UIcon v-else name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5" />
          {{ isDownloading ? 'Loading...' : `Download (${store.selectedCount})` }}
        </button>

        <button
          :disabled="store.selectedCount === 0 || isDeleting"
          class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-opacity
            border-red-400 text-red-500 bg-red-50
            dark:border-red-500 dark:text-red-400 dark:bg-red-950
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-red-100 dark:hover:bg-red-900"
          @click="handleDeleteClick"
        >
          <UIcon v-if="isDeleting" name="i-heroicons-arrow-path" class="w-3.5 h-3.5 animate-spin" />
          <UIcon v-else name="i-heroicons-trash" class="w-3.5 h-3.5" />
          {{ isDeleting ? 'Loading...' : `Delete (${store.selectedCount})` }}
        </button>
      </div>
    </div>

    <!-- Info — hides until data loads -->
    <div v-if="store.data" class="flex items-center gap-3 text-xs text-gray-900 dark:text-gray-500 w-full md:w-auto">
      <span>24h window</span>
      <div class="w-px h-3 bg-gray-200 dark:bg-gray-700" />
      <span>{{ totalChunks }} chunks</span>
    </div>

  </div>
</template>