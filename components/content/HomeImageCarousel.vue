<script setup lang="ts">
defineProps<{
  images: string[];
}>();
</script>

<template>
  <!-- Rendered on the server too: ImageCarousel's markup (slides + first image eager)
       is complete HTML, and Embla only measures and enhances it on mount. The old
       ClientOnly + hydrate-on-visible wrapper replaced this with a single fallback
       image until scrolled into view, which read as a hydration flicker. -->
  <ImageCarousel :images="images" fit="contain" />
</template>
