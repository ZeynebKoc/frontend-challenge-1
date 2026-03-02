import { useChunksStore } from '~/stores/chunks'
import { useFormatters } from './useFormatters'

export function useChunkStats() {
  const store = useChunksStore()
  const { formatSizeShort, formatCount } = useFormatters()

  const totalRecords = computed(() =>
    store.data ? formatCount(store.data.dataCount) : '-'
  )

  const totalChunks = computed(() =>
    store.data ? store.data.dataChunkCount.toLocaleString() : '-'
  )

  const sizeOnDisk = computed(() =>
    store.data ? formatSizeShort(store.data.sizeOnDisk) : '-'
  )

  const avgCompression = computed(() =>
    store.data ? store.data.compressionRatio.toFixed(2) + '%' : '-'
  )

  return { totalRecords, totalChunks, sizeOnDisk, avgCompression }
}