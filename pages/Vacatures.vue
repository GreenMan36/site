<script setup lang="ts">
const { data: allPartners } = await useAsyncData('vacatures-partners', () =>
  queryCollection('partners').all(),
);

const allOffers = computed(() => {
  if (!allPartners.value) return [];
  return allPartners.value.flatMap((p) =>
    (p.jobOffers || []).map((offer: Record<string, unknown>) => ({
      ...offer,
      partnerName: p.title,
    })),
  );
});
</script>

<template>
  <ContentContainer>
    <h1>Vacatures</h1>
    <p v-if="!allOffers.length">Er zijn op dit moment geen vacatures beschikbaar.</p>
    <div v-for="offer in allOffers" :key="`${offer.partnerName}-${offer.title}`" class="offer">
      <h3>{{ offer.title }}</h3>
      <p v-if="offer.partnerName" class="partner-name">{{ offer.partnerName }}</p>
      <p v-if="offer.description">{{ offer.description }}</p>
    </div>
  </ContentContainer>
</template>

<style scoped>
.offer {
  background: var(--secondary-background-color);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
}

.partner-name {
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>
