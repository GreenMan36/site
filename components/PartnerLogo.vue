<script setup lang="ts">
const props = defineProps<{
  partner: {
    title: string;
    imgUrl?: string;
    imgUrlDark?: string;
  };
  alt?: string;
  class?: string;
}>();

const lightLogo = props.partner.imgUrl ? `/assets/partners/${props.partner.imgUrl}` : '';
const darkLogo = props.partner.imgUrlDark ? `/assets/partners/${props.partner.imgUrlDark}` : lightLogo;
const hasDarkVariant = !!props.partner.imgUrlDark;
</script>

<template>
  <span v-if="hasDarkVariant" class="theme-logo-wrapper">
    <img :src="lightLogo" :alt="alt || `Logo ${partner.title}`" :class="[props.class, 'light-only']" />
    <img :src="darkLogo" :alt="alt || `Logo ${partner.title}`" :class="[props.class, 'dark-only']" />
  </span>
  <img v-else :src="lightLogo" :alt="alt || `Logo ${partner.title}`" :class="props.class" />
</template>

<style>
/* Theme-aware logo visibility - must be unscoped to work with parent styles */
html:not([data-theme='dark']) .dark-only {
  display: none !important;
}

html[data-theme='dark'] .light-only {
  display: none !important;
}
</style>

<style scoped>
.theme-logo-wrapper {
  display: contents;
}
</style>
