<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue' 
import AppToolbar from '~/components/layout/AppToolbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue' 
</script>

<template>
  <div class="min-h-screen flex flex-col bg-mist-300 dark:bg-zinc-950">
    <div class="sticky top-0 z-40">
      <AppHeader />
      <AppToolbar />
    </div>
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>