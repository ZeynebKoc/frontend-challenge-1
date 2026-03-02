<script setup lang="ts">
import { useChunksStore } from '~/stores/chunks'
const { formatSize, formatCount } = useFormatters()

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const store = useChunksStore()

const isConfirmed = ref(false)
const isDeleting = ref(false)
const deleteResult = ref<string | null>(null)

const close = () => {
  emit('update:open', false)
  isConfirmed.value = false
  deleteResult.value = null
  deleteResult.value = null
}

// Handles the delete operation for selected chunks
const handleDelete = async () => {
  isDeleting.value = true
  try {
    const result = await store.deleteSelected()
    deleteResult.value = result.additionalInfo
  } catch {
    deleteResult.value = 'Delete operation failed'
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg min-w-[480px]">

        <!-- Success state -->
        <div v-if="deleteResult" class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-emerald-500" />
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Operation Complete</h3>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ deleteResult }}</p>
          <div class="flex justify-end">
            <UButton size="sm" color="neutral" variant="soft" @click="close">Close</UButton>
          </div>
        </div>

        <!-- Confirmation state -->
        <template v-else>

          <!-- Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-red-500" />
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Confirm Delete</h3>
            </div>
            <UButton variant="ghost" color="neutral" size="xs" icon="i-heroicons-x-mark" @click="close" />
          </div>

          <!-- Warning banner -->
          <div class="flex items-center gap-2 px-3 py-2 rounded border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500 shrink-0" />
            <span class="text-xs text-red-600 dark:text-red-400">
                This action is irreversible. Deleted chunks cannot be recovered.
            </span>
          </div>

          <!-- Summary section -->
          <div class="grid grid-cols-3 gap-2">
            <div class="flex flex-col gap-0.5 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-center">
              <span class="text-base font-semibold text-gray-900 dark:text-white">{{ store.selectedCount }}</span>
              <span class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Chunks</span>
            </div>
            <div class="flex flex-col gap-0.5 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-center">
              <span class="text-base font-semibold text-gray-900 dark:text-white">{{ formatSize(store.totalSelected.size) }}</span>
              <span class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Total Size</span>
            </div>
            <div class="flex flex-col gap-0.5 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-center">
              <span class="text-base font-semibold text-gray-900 dark:text-white">{{ formatCount(store.totalSelected.records) }}</span>
              <span class="text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Records</span>
            </div>
          </div>

          <!-- Selected chunk list -->
          <div class="border border-gray-200 dark:border-gray-700 rounded overflow-hidden max-h-40 overflow-y-auto">
            <div
              v-for="date in store.selectedChunks"
              :key="`${date.hour}-${date.minute}`"
              class="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span class="text-[11px] font-mono text-gray-600 dark:text-gray-400">
                chunk_{{ date.year }}_{{ String(date.month).padStart(2,'0') }}_{{ String(date.day).padStart(2,'0') }}_{{ String(date.hour).padStart(2,'0') }}_{{ String(date.minute).padStart(2,'0') }}.dat
              </span>
            </div>
          </div>

          <!-- Confirmation checkbox -->
          <label class="flex items-start gap-2 cursor-pointer px-3 py-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <UCheckbox v-model="isConfirmed" class="mt-0.5" />
            <span class="text-xs text-gray-600 dark:text-gray-400">
              I understand this action cannot be undone and all selected chunks will be permanently deleted.
            </span>
          </label>

          <!-- Action buttons -->
          <div class="flex justify-end gap-2">
            <UButton size="sm" color="neutral" variant="soft" @click="close">Cancel</UButton>
            <UButton
              size="sm"
              color="error"
              :disabled="!isConfirmed || isDeleting"
              :loading="isDeleting"
              icon="i-heroicons-trash"
              @click="handleDelete"
            >
              Delete Permanently
            </UButton>
          </div>

        </template>
      </div>
    </template>
  </UModal>
</template>