<script setup lang="ts">
import type { DownloadFile } from '~/types'
const { formatSize } = useFormatters()

const props = defineProps<{
  open: boolean
  files: DownloadFile[]
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const downloadStarted = ref(false)

const close = () => {
  emit('update:open', false)
  downloadStarted.value = false
}

// Programmatically trigger download for each file without navigating away
const handleDownloadAll = () => {
  props.files.forEach(file => {
    const link = document.createElement('a')
    link.href = file.downloadUrl
    link.download = file.fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
  downloadStarted.value = true
}
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg min-w-[480px]">

        <!-- Success state -->
        <div v-if="downloadStarted" class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-emerald-500" />
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Download Started</h3>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ files.length }} file{{ files.length > 1 ? 's' : '' }} download started successfully.
          </p>
          <div class="flex justify-end">
            <UButton size="sm" color="neutral" variant="soft" @click="close">Close</UButton>
          </div>
        </div>

        <!-- File list state -->
        <template v-else>

          <!-- Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-arrow-down-tray" class="w-5 h-5 text-emerald-500" />
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Download Files</h3>
            </div>
            <UButton variant="ghost" color="neutral" size="xs" icon="i-heroicons-x-mark" @click="close" />
          </div>

          <div class="w-full h-px bg-gray-200 dark:bg-gray-700" />

          <!-- File list -->
          <div class="flex flex-col border border-gray-200 dark:border-gray-700 rounded overflow-hidden max-h-80 overflow-y-auto">
            <div
              v-for="file in files"
              :key="file.fileId"
              class="flex items-center justify-between gap-4 px-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <!-- File info -->
              <div class="flex flex-col gap-0.5 min-w-0">
                <span class="text-[11px] font-mono text-gray-700 dark:text-gray-300 truncate">
                  {{ file.fileName }}
                </span>
                <span class="text-[10px] text-gray-400 dark:text-gray-500">
                  {{ formatSize(file.fileSize) }} · Expires {{ new Date(file.expirationDate).toLocaleDateString('tr-TR') }}
                </span>
              </div>

              <!-- Individual download link -->
               <UButton
                size="xs"
                color="primary"
                variant="ghost"
                icon="i-heroicons-arrow-down-tray"
                :to="file.downloadUrl"
                target="_blank"
                @click="useToast().add({ title: 'Download started', description: file.fileName, color: 'success' })"
              >
                Download
              </UButton>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end items-center gap-2">
            <UButton size="sm" color="neutral" variant="soft" @click="close">Cancel</UButton>
            <UButton size="sm" color="primary" variant="solid" icon="i-heroicons-arrow-down-tray" @click="handleDownloadAll">
              Download All
            </UButton>
          </div>

        </template>
      </div>
    </template>
  </UModal>
</template>