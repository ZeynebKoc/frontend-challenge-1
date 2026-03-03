<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'

const store = useChunksStore()

onMounted(async () => {
  await store.fetchChunks()
})
</script>

<template>
  <div class="overflow-x-auto">

    <!-- Loading -->
    <div v-if="store.isLoading" class="flex flex-col items-center justify-center gap-3 py-20">
    <div class="w-6 h-6 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    <span class="text-sm text-gray-400 dark:text-gray-500">Loading chunks...</span>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="flex flex-col items-center justify-center gap-3 py-20">
      <UIcon name="i-heroicons-exclamation-circle" class="w-6 h-6 text-red-400" />
      <span class="text-sm text-red-400">{{ store.error }}</span>
      <button
        class="text-xs text-emerald-600 dark:text-emerald-400 underline"
        @click="store.fetchChunks()"
      >
        Try again
      </button>
    </div>

    <!-- Grid -->
    <div v-else-if="store.data" class="w-max py-2">
      <HourRow
        v-for="group in store.data.groups"
        :key="`${group.date.day}-${group.date.hour}`"
        :group="group"
        :is-selected="store.isSelected"
        :min-data-count="store.data.minDataCount"
        :max-data-count="store.data.maxDataCount"
        @toggle-cell="store.toggleChunkSelection"
        @toggle-hour="store.toggleHourSelection"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center gap-3 py-20">
      <UIcon name="i-heroicons-inbox" class="w-8 h-8 text-gray-300 dark:text-gray-600" />
      <span class="text-sm text-gray-400 dark:text-gray-500">No chunk data available</span>
    </div>

  </div>
</template>