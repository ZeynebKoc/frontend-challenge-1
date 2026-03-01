import { defineStore } from 'pinia'
import type { SignedFilesResponse, ChunkDate, DownloadFile, DeleteResult } from '~/types'

export const useChunksStore = defineStore('chunks', () => {

  // ---- STATE ----
  const data = ref<SignedFilesResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedChunks = ref<ChunkDate[]>([]) 

  // ---- GETTERS ----
  // Returns whether a specific chunk is currently selected
  const isSelected = computed(() => (date: ChunkDate) => { 
    return selectedChunks.value.some(
      d => d.hour === date.hour && d.minute === date.minute
    )
  })

  // Total number of selected chunks
  const selectedCount = computed(() => selectedChunks.value.length) 

  // Aggregated summary of selected chunks
  const totalSelected = computed(() => {     
    if (!data.value) return { size: 0, records: 0 } 
    let size = 0
    let records = 0
    for (const group of data.value.groups) {
      for (const bucket of group.buckets) {
        if (isSelected.value(bucket.date)) {
          size += bucket.sizeOnDisk
          records += bucket.dataCount
        }
      }
    }
    return { size, records }
  })

  // ---- ACTIONS ----
  // Fetches daily chunk dataset from API
  async function fetchChunks() { 
    isLoading.value = true
    error.value = null
    try {
      data.value = await $fetch<SignedFilesResponse>('/api/chunks')
    } catch (e) {
      error.value = 'Failed to load chunk data'
    } finally {
      isLoading.value = false
    }
  }

  // Toggles selection state for a single chunk
  function toggleChunkSelection(date: ChunkDate) { 
    const index = selectedChunks.value.findIndex(
      d => d.hour === date.hour && d.minute === date.minute
    )
    if (index === -1) {
      selectedChunks.value.push(date)
    } else {
      selectedChunks.value.splice(index, 1)
    }
  }

  // Toggles selection state for an entire hour group
  function toggleHourSelection(hour: number) { 
    if (!data.value) return
    const group = data.value.groups.find(g => g.date.hour === hour)
    if (!group) return

    const allSelected = group.buckets.every(b => isSelected.value(b.date))

    if (allSelected) {
      selectedChunks.value = selectedChunks.value.filter(d => d.hour !== hour)
    } else {
      for (const bucket of group.buckets) {
        if (!isSelected.value(bucket.date)) {
          selectedChunks.value.push(bucket.date)
        }
      }
    }
  }

  // Toggles global selection state across all chunks 
  function toggleSelectAll() {
    if (!data.value) return
    const allBuckets = data.value.groups.flatMap(g => g.buckets)
    const allSelected = allBuckets.every(b => isSelected.value(b.date))

    if (allSelected) {
      selectedChunks.value = []
    } else {
      selectedChunks.value = allBuckets.map(b => b.date)
    }
  }

  // Clears current selection state
  function clearSelectedChunks() {
    selectedChunks.value = []
  }

  // Fetch download URLs 
  async function fetchDownloadUrls(): Promise<DownloadFile[]> {
    return await $fetch<DownloadFile[]>('/api/chunks/download-urls', {
      method: 'POST',
      body: { dates: selectedChunks.value }
    })
  }

  // Deletes selected chunks 
  async function deleteSelected(): Promise<DeleteResult> {
    const result = await $fetch<DeleteResult>('/api/chunks', {
      method: 'DELETE',
      body: { dates: selectedChunks.value }
    })
    clearSelectedChunks()
    return result
  }

  return {
    // state
    data,
    isLoading,
    error,
    selectedChunks,
    // getters
    isSelected,
    selectedCount,
    totalSelected,
    // actions
    fetchChunks,
    toggleChunkSelection,
    toggleHourSelection,
    toggleSelectAll,
    clearSelectedChunks,
    fetchDownloadUrls,
    deleteSelected
  }
})