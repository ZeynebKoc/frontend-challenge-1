import { computed } from 'vue'
import { useChunksStore } from '~/stores/chunks'

export function useTotalChunks() {
  const store = useChunksStore()

  const totalChunks = computed(() => {
    const n = store.data?.dataChunkCount ?? 0
    return n.toLocaleString()
  })

  return { totalChunks }
}