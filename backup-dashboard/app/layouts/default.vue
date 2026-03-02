<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue' 
import AppToolbar from '~/components/layout/AppToolbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue' 
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <AppToolbar />
    <main class="flex-1 overflow-auto">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>