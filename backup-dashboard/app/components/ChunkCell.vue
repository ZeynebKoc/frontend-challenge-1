<script setup lang="ts">
import type { Bucket, ChunkDate } from '~/types'
const { formatSize } = useFormatters()

const props = defineProps<{
  bucket: Bucket
  isSelected: boolean
  color: string
}>()

const emit = defineEmits<{
  toggle: [date: ChunkDate]
}>()
</script>

<template>
  <UTooltip :popper="{ placement: 'top' }">

    <!-- Chunk -->
    <div
      class="relative w-3 h-3 cursor-pointer transition-transform hover:scale-150 hover:z-10 rounded-[2px]"
      :style="{ backgroundColor: color || '#064e3b' }"
      :class="isSelected ? 'ring-1 ring-emerald-400' : ''"
      @click="emit('toggle', bucket.date)"
    >
      <span
        v-if="isSelected"
        class="absolute inset-0 flex items-center justify-center font-bold text-emerald-400"
        style="font-size: 7px; line-height: 1;"
      >
        ✓
      </span>
    </div>

    <!-- Tooltip -->
    <template #content>
      <div class="flex flex-col gap-2 px-3 py-2 min-w-[150px] rounded border font-mono
        bg-white border-gray-400 shadow-md
        dark:bg-gray-900 dark:border-gray-700 dark:shadow-black/40">

        <!-- Time -->
        <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider">
          {{ bucket.date.hour }}:{{ String(bucket.date.minute).padStart(2, '0') }}
        </span>

        <div class="w-full h-px bg-gray-400 dark:bg-gray-700" />

        <!-- Chunk Data -->
        <div class="flex flex-col gap-1">
          <div class="flex justify-between gap-6">
            <span class="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">Records</span>
            <span class="text-[10px] text-gray-900 dark:text-gray-200">{{ bucket.dataCount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between gap-6">
            <span class="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">Size</span>
            <span class="text-[10px] text-gray-900 dark:text-gray-200">{{ formatSize(bucket.sizeOnDisk) }}</span>
          </div>
          <div class="flex justify-between gap-6">
            <span class="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">Ratio</span>
            <span class="text-[10px] text-gray-900 dark:text-gray-200">{{ bucket.compressionRatio.toFixed(1) }}%</span>
          </div>
        </div>

      </div>
    </template>

  </UTooltip>
</template>