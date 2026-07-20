<script setup lang="ts">
useSeoMeta({
  title: 'Over Indicium',
  description: 'Dé studievereniging voor HBO-ICT van Hogeschool Utrecht',
});

const { data: page } = await useAsyncData('about', () => queryCollection('about').first());

const carouselImages = ['/assets/images/Karten-20.webp', '/assets/images/Poolen-12.webp', '/assets/images/DSC_2852.webp'];

const stats = [
  { number: '300+', label: 'Leden' },
  { number: 'HU', label: 'Hogeschool Utrecht' },
  { number: 'ICT', label: 'Voor & door studenten' },
];
</script>

<template>
  <ContentContainer>
    <h1>Over Indicium</h1>

    <div class="carousel">
      <ClientOnly>
        <LazyImageCarousel
          :images="carouselImages"
          alt="Over Indicium slider"
          :slides-per-view="1.5"
          align="center"
          height="32em"
          max-height="32em"
          fit="cover"
          hydrate-on-visible
        />
        <template #fallback>
          <img
            alt="Over Indicium slider"
            :src="carouselImages[0]"
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

    <ContentRenderer v-if="page" :value="page" />

    <div v-if="page" class="text-container" style="max-width: 860px; margin: 2.25rem auto 0;">
      <div class="stats-row">
        <div v-for="item in stats" :key="item.label" class="stat-card">
          <span class="stat-card__number">{{ item.number }}</span>
          <span class="stat-card__label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </ContentContainer>
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

.stats-row {
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  text-align: center;
  border-radius: 10px;
  padding: 1rem 0.75rem;
  background: var(--secondary-background-color);
  border: 1px solid rgba(var(--indi-blue-1-raw), 0.25);
}

.stat-card__number {
  font-family: var(--indicium-font);
  font-size: 1.9rem;
  line-height: 1;
  color: var(--indi-blue-1);
}

.stat-card__label {
  font-size: 0.95rem;
  color: rgba(var(--text-color-raw), 0.82);
}

@media (max-width: 944px) {
  .carousel {
    height: 26em;
    max-height: 26em;
  }
  .stats-row {
    grid-template-columns: 1fr;
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
