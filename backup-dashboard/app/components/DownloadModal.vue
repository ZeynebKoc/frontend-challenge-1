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

const close = () => emit('update:open', false)
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg min-w-[480px]">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-down-tray" class="w-5 h-5 text-emerald-500" />
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Download URLs</h3>
          </div>
          <UButton variant="ghost" color="neutral" size="xs" icon="i-heroicons-x-mark" @click="close" />
        </div>

        <div class="w-full h-px bg-gray-200 dark:bg-gray-700" />

        <!-- File list -->
        <div class="flex flex-col gap-0 border border-gray-200 dark:border-gray-700 rounded overflow-hidden max-h-80 overflow-y-auto">
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

            <!-- Download link -->
            <a
              :href="file.downloadUrl"
              target="_blank"
              class="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
            >
              <UIcon name="i-heroicons-arrow-down-tray" class="w-3.5 h-3.5" />
              Download
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-between items-center">
          <span class="text-[11px] text-gray-400 dark:text-gray-500">{{ files.length }} files ready</span>
          <UButton size="sm" color="neutral" variant="soft" @click="close">Close</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>