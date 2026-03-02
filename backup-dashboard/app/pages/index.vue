<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'
import type { DownloadFile } from '~/types'

definePageMeta({ layout: 'default' })

const isDownloadOpen = ref(false)
const downloadFiles = ref<DownloadFile[]>([])
const store = useChunksStore()

// Listen for events from the toolbar
const handleDownload = async () => {
  downloadFiles.value = await store.fetchDownloadUrls()
  isDownloadOpen.value = true
}

provide('openDownload', handleDownload)
</script>

<template>
  <NuxtLayout name="default">
    <ChunkGrid />
    <DownloadModal v-model:open="isDownloadOpen" :files="downloadFiles" />
  </NuxtLayout>
</template>
