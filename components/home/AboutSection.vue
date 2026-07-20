<script setup lang="ts">
defineProps<{
  title: string;
  ctaLabel?: string;
  ctaUrl?: string;
}>();
</script>

<template>
  <div class="text-container">
    <h2>{{ title }}</h2>
    <slot />
    <NuxtLink v-if="ctaLabel && ctaUrl" class="button primary rounded" :to="ctaUrl">{{ ctaLabel }}</NuxtLink>
  </div>
</template>

<style scoped>
.text-container {
  max-width: 860px;
  margin: 2.25rem auto 0;

  & h2 {
    position: relative;
    margin: 0 0 0.7rem;
    padding-bottom: 0.4rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 3.25rem;
      height: 3px;
      border-radius: 2px;
      background: var(--indi-blue-1);
    }
  }

  :deep(p) {
    margin: 0;
    line-height: 1.78;
    color: var(--text-color);
  }

  .button {
    margin-top: 1rem;
    display: inline-block;
  }
}

@media (max-width: 768px) {
  .text-container {
    margin-top: 1.75rem;
  }
}
</style>
