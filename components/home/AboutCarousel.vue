<script setup lang="ts">
defineProps<{
  images: string[];
}>();
</script>

<template>
  <div class="carousel">
    <ClientOnly>
      <LazyImageCarousel
        :images="images"
        alt="Over Indicium slider"
        :slides-per-view="1.5"
        align="center"
        height="32em"
        max-height="32em"
        fit="cover"
        hydrate-on-visible"
      />
      <template #fallback>
        <img
          alt="Over Indicium slider"
          :src="images[0]"
          class="carousel-fallback"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          width="1600"
          height="900"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.carousel {
  margin: 1.5rem auto 0;
  width: 100%;
  max-width: 1080px;
  height: 30em;
  max-height: 30em;
  border-radius: 10px;
  overflow: hidden;
  background: var(--secondary-background-color);
  border: 1px solid rgba(var(--indi-blue-1-raw), 0.3);
}

.carousel-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 944px) {
  .carousel {
    height: 26em;
    max-height: 26em;
  }
}

@media (max-width: 768px) {
  .carousel {
    margin-top: 1rem;
    height: 22em;
    max-height: 22em;
    border-radius: 8px;
  }
}
</style>
