<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'
import type { DownloadFile } from '~/types'

definePageMeta({ layout: 'default' })

const isDownloadOpen = ref(false)
const isDeleteOpen = ref(false)
const downloadFiles = ref<DownloadFile[]>([])
const store = useChunksStore()

const handleDownload = async () => {
  downloadFiles.value = await store.fetchDownloadUrls()
  isDownloadOpen.value = true
}

// Returns a promise that resolves when modal closes
const handleDelete = async () => {
  isDeleteOpen.value = true
  // Promise resolves immediately after modal opens
  return Promise.resolve()
}

provide('openDownload', handleDownload)
provide('openDelete', handleDelete)
</script>

<template>
  <NuxtLayout name="default">
    <ChunkGrid />
    <DownloadModal v-model:open="isDownloadOpen" :files="downloadFiles" />
    <DeleteModal v-model:open="isDeleteOpen" />
  </NuxtLayout>
</template>
