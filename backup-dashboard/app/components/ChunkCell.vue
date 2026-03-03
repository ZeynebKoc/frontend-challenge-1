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

const showTooltip = ref(false)
const tooltipStyle = ref({})
const cellRef = ref<HTMLElement>()
let showTimer: ReturnType<typeof setTimeout>

const onMouseEnter = () => {
  showTimer = setTimeout(() => {
    if (!cellRef.value) return
    const rect = cellRef.value.getBoundingClientRect()
    tooltipStyle.value = {
      position: 'fixed',
      left: `${rect.left + rect.width / 2}px`,
      top: `${rect.top - 8}px`,
      transform: 'translate(-50%, -100%)',
      zIndex: 9999,
    }
    showTooltip.value = true
  }, 300)
}

const onMouseLeave = () => {
  clearTimeout(showTimer)
  showTooltip.value = false
}
</script>

<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <!-- Chunk cell -->
    <div
      ref="cellRef"
      class="w-3 h-3 cursor-pointer transition-transform border border-gray-500 dark:border-zinc-700 hover:scale-150 rounded-[2px]"
      :style="{ backgroundColor: color || '#064e3b' }"
      :class="isSelected ? 'ring-2 ring-emerald-400 ring-offset-1 brightness-125' : ''"
      @click="emit('toggle', bucket.date)"
    >
      <span
        v-if="isSelected"
        class="absolute inset-0 flex items-center justify-center font-bold text-emerald-400"
        style="font-size: 7px; line-height: 1;"
      >✓</span>
    </div>

    <!-- Teleport to body -->
    <Teleport to="body">
      <div
        v-if="showTooltip"
        :style="tooltipStyle"
        class="pointer-events-none flex flex-col gap-2 px-3 py-2 min-w-[150px] rounded border font-mono whitespace-nowrap
          bg-white border-gray-400 shadow-md
          dark:bg-gray-900 dark:border-gray-700"
      >
        <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wider">
          {{ bucket.date.hour }}:{{ String(bucket.date.minute).padStart(2, '0') }}
        </span>
        <div class="w-full h-px bg-gray-400 dark:bg-gray-700" />
        <div class="flex flex-col gap-1">
          <div class="flex justify-between gap-6">
            <span class="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">Records</span>
            <span class="text-[10px] text-black dark:text-gray-200">{{ bucket.dataCount.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between gap-6">
            <span class="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">Size</span>
            <span class="text-[10px] text-black dark:text-gray-200">{{ formatSize(bucket.sizeOnDisk) }}</span>
          </div>
          <div class="flex justify-between gap-6">
            <span class="text-[10px] uppercase tracking-wide text-gray-600 dark:text-gray-400">Ratio</span>
            <span class="text-[10px] text-black dark:text-gray-200">{{ bucket.compressionRatio.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>