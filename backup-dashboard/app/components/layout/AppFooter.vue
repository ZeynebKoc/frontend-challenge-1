<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'

const store = useChunksStore()
const { colorLevels } = useColorMap()

import { useTotalChunks } from '~/composables/useTotalChunks'
const { totalChunks } = useTotalChunks()

const totalRecords = computed(() => {
  if (!store.data) return '-'
  const n = store.data.dataCount
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
})

const sizeOnDisk = computed(() => {
  if (!store.data) return '-'
  const bytes = store.data.sizeOnDisk
  if (bytes >= 1_048_576) return (bytes / 1_048_576).toFixed(0) + ' MB'
  if (bytes >= 1_024) return (bytes / 1_024).toFixed(0) + ' KB'
  return bytes + ' B'
})

const avgCompression = computed(() => {
  if (!store.data) return '-'
  return store.data.compressionRatio.toFixed(2) + '%'
})
</script>

<template>
  <footer class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-3 border-t bg-white border-gray-400 dark:bg-zinc-950 dark:border-gray-800">

    <!-- Statistics -->
    <div class="grid grid-cols-2 sm:flex sm:items-center gap-0">

      <!-- Total Records -->
      <div class="flex flex-col gap-0.5 px-4 py-1">
        <span class="text-base font-semibold text-gray-900 dark:text-white">{{ totalRecords }}</span>
        <span class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Total Records</span>
      </div>

      <div class="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

      <!-- Total Chunks -->
      <div class="flex flex-col gap-0.5 px-4 py-1">
        <span class="text-base font-semibold text-gray-900 dark:text-white">{{ totalChunks }}</span>
        <span class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Total Chunks</span>
      </div>

      <div class="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

      <!-- Size on Disk -->
      <div class="flex flex-col gap-0.5 px-4 py-1">
        <span class="text-base font-semibold text-gray-900 dark:text-white">{{ sizeOnDisk }}</span>
        <span class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Size on Disk</span>
      </div>

      <div class="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

      <!-- Avg Compression -->
      <div class="flex flex-col gap-0.5 px-4 py-1">
        <span class="text-base font-semibold text-gray-900 dark:text-white">{{ avgCompression }}</span>
        <span class="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Avg Compression</span>
      </div>

    </div>

    <!-- Color scale -->
    <div class="flex items-center gap-2 px-4 sm:px-0">
      <span class="text-[10px] text-gray-400 dark:text-gray-500">Less</span>
      <div class="flex gap-[2px]">
        <div
          v-for="(color, index) in colorLevels"
          :key="index"
          class="w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-700"
          :style="{ backgroundColor: color === 'transparent' ? 'transparent' : color }"
        />
      </div>
      <span class="text-[10px] text-gray-400 dark:text-gray-500">More</span>
    </div>

  </footer>
</template>