<script setup lang="ts">
import type { ChunkGroup, ChunkDate } from '~/types'
const { formatSize, formatCount } = useFormatters()

const props = defineProps<{
  group: ChunkGroup
  isSelected: (date: ChunkDate) => boolean
  minDataCount: number
  maxDataCount: number
}>()

const emit = defineEmits<{
  toggleCell: [date: ChunkDate]
  toggleHour: [hour: number]
}>()

const { getColor } = useColorMap()

// True when all buckets in this hour are selected
const isHourSelected = computed(() =>
  props.group.buckets.every(b => props.isSelected(b.date))
)

// True when some but not all buckets in this hour are selected
const isHourIndeterminate = computed(() => {
  const count = props.group.buckets.filter(b => props.isSelected(b.date)).length
  return count > 0 && count < props.group.buckets.length
})
</script>

<template>
  <div class="flex items-center gap-3 py-[1px] px-6 hover:bg-white dark:hover:bg-zinc-950 transition-colors">

    <!-- Row selection checkbox -->
    <div class="inline-flex items-center justify-center px-0.25 rounded border border-gray-600 dark:border-gray-600">
      <UCheckbox
        :model-value="isHourSelected"
        :indeterminate="isHourIndeterminate"
        color="success" size="sm"
        @update:model-value="emit('toggleHour', group.date.hour)"
      />
    </div>

    <!-- Timestamp label -->
    <span class="text-[11px] font-mono w-10 text-right shrink-0 text-gray-900 dark:text-gray-200">
      {{ group.date.hour }}:00
    </span>

    <!-- 60 minute chunks -->
    <div class="flex gap-[5px] flex-1">
      <ChunkCell
        v-for="bucket in group.buckets"
        :key="bucket.date.minute"
        :bucket="bucket"
        :is-selected="isSelected(bucket.date)"
        :color="getColor(bucket.dataCount, minDataCount, maxDataCount)"
        @toggle="emit('toggleCell', $event)"
      />
    </div>

    <!-- Hour statistics: records, size, compression -->
    <div class="flex items-center gap-3 shrink-0 ml-2">
      <span class="text-[10px] font-mono text-gray-900 dark:text-gray-200 w-10 text-right">
        {{ formatCount(group.dataCount) }}
      </span>
      <span class="text-[10px] font-mono text-gray-900 dark:text-gray-200 w-14 text-right">
        {{ formatSize(group.sizeOnDisk) }}
      </span>
      <span class="text-[10px] font-mono text-gray-900 dark:text-gray-200 w-10 text-right">
        {{ group.compressionRatio.toFixed(1) }}%
      </span>
    </div>

  </div>
</template>