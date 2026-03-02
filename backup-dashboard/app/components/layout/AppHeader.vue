<script setup lang="ts">
const colorMode = useColorMode()
const today = new Date().toLocaleDateString('tr-TR').replace(/\./g, '/')

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <header class="flex items-center justify-between px-6 py-3 border-b bg-white border-gray-200 dark:bg-zinc-950 dark:border-gray-800">
    <div class="flex items-center gap-3">
      <UIcon name="i-heroicons-shield-check" class="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
      <div>
        <h1 class="text-sm font-semibold tracking-widest uppercase text-black dark:text-white">
          DataGuard
        </h1>
        <p class="text-xs text-gray-600 dark:text-gray-300">
          Backup Integrity Monitor
        </p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center flex-col md:flex-row">
        <span class="text-xs text-gray-600 dark:text-gray-300">{{ today }}</span>
        <div class="flex items-center gap-2 ml-0 md:ml-3">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-xs text-gray-600 dark:text-gray-300">Live</span>
        </div>
      </div>
      
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <div class="size-8" />
        </template>
      </ClientOnly>
    </div>
  </header>
</template>