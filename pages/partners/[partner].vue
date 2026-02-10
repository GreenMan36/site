<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import JobOffers from '@/components/JobOffers.vue';
import PartnerLogo from '@/components/PartnerLogo.vue';

const route = useRoute();
const partnerSlug = route.params.partner as string;

// Query the partner by slug
const { data: partner } = await useAsyncData(`partner-${partnerSlug}`, () =>
  queryCollection('partners').where('slug', '=', partnerSlug).where('tier', '!=', null).first(),
);

// Query job offers for this partner (items with partnerSlug matching)
const { data: jobOffers } = await useAsyncData(`partner-jobs-${partnerSlug}`, () =>
  queryCollection('partners').where('partnerSlug', '=', partnerSlug).all(),
);
</script>

<template>
  <ContentContainer v-if="partner">
    <h1>{{ partner.title }}</h1>
    <div id="partner" class="container">
      <div class="details">
        <a v-if="partner.url" :href="partner.url" target="_blank">
          <PartnerLogo :partner="partner" class="partner-logo" />
        </a>
        <PartnerLogo v-else :partner="partner" class="partner-logo" />
        <div class="description">
          <ContentRenderer :value="partner" />
          <a v-if="partner.url" class="readMoreOutboundBtn button primary rounded" :href="partner.url" target="_blank">
            Naar de website
          </a>
        </div>
      </div>
      <JobOffers v-if="jobOffers && jobOffers.length" :offers="jobOffers" />
    </div>
  </ContentContainer>
  <ContentContainer v-else>
    <h1>Partner niet gevonden</h1>
    <p>De partner die je zoekt bestaat niet of is niet meer beschikbaar.</p>
    <NuxtLink to="/partners" class="button primary rounded">Terug naar partners</NuxtLink>
  </ContentContainer>
</template>

<style scoped lang="scss">
.job-offer-description ul {
  list-style: circle;
}

#partner {
  margin: 2em auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    @media screen and (max-width: #{$bp-desktop-lg}) {
      grid-template-columns: 1fr;
      gap: 2em;
    }

    .partner-logo {
      height: auto;
    }

    .description {
      text-align: left;
    }
  }
}
</style>
