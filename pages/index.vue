<script setup lang="ts">
const { data: home } = await useAsyncData('home', () => queryCollection('home').first());
</script>

<template>
  <div>
    <HeroSection class="hero" />
    <ContentRenderer v-if="home" :value="home" />
  </div>
</template>

<style scoped>
.hero {
  padding-top: var(--nav-height);
}
</style>
