<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue' 
import AppToolbar from '~/components/layout/AppToolbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue' 
</script>

<template>
  <div class="min-h-screen flex flex-col bg-mist-300 dark:bg-zinc-950/50">
    <AppHeader />
    <AppToolbar />
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>