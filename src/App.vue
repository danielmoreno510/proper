<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <main>
    <Header />
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>
