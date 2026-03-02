import { computed } from 'vue'
import { useChunksStore } from '~/stores/chunks'

export function useTotalChunks() {
  const store = useChunksStore()

  const totalChunks = computed(() => {
    const n = store.data?.dataChunkCount ?? '-'
    return n.toLocaleString()
  })

  return { totalChunks }
}