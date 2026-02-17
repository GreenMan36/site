<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import JobOffers from '@/components/JobOffers.vue';
import PartnerLogo from '@/components/PartnerLogo.vue';

// Query partners collection by tier
const { data: mainPartner } = await useAsyncData('mainPartner', () =>
  queryCollection('partners').where('tier', '=', 'main').first(),
);

const { data: premiumPartners } = await useAsyncData('premiumPartners', () =>
  queryCollection('partners').where('tier', '=', 'premium').order('order', 'ASC').all(),
);

const { data: regularPartners } = await useAsyncData('regularPartners', () =>
  queryCollection('partners').where('tier', '=', 'regular').order('order', 'ASC').all(),
);

// Query job offers for main partner
const { data: mainPartnerJobOffers } = await useAsyncData('mainPartnerJobOffers', async () => {
  if (!mainPartner.value?.slug) return [];
  return await queryCollection('partners').where('partnerSlug', '=', mainPartner.value.slug).all();
});
</script>

<template>
  <ContentContainer>
    <h1>Partners</h1>
    <div v-if="mainPartner" id="main-partner" class="container">
      <div class="details">
        <a v-if="mainPartner.url" :href="mainPartner.url" target="_blank">
          <PartnerLogo :partner="mainPartner" class="partner-logo" />
        </a>
        <PartnerLogo v-else :partner="mainPartner" class="partner-logo" />
        <div class="description">
          <h3>Hoofdpartner: {{ mainPartner.title }}</h3>
          <ContentRenderer :value="mainPartner" />
          <a class="readMore button primary rounded" href="mailto:secretaris@indicium.nl">Neem contact op!</a>
        </div>
      </div>
      <JobOffers v-if="mainPartnerJobOffers && mainPartnerJobOffers.length" :offers="mainPartnerJobOffers" />
    </div>

    <hr class="dashed-line" />

    <h1>Premium partners</h1>
    <div v-for="partner in premiumPartners || []" :key="partner.slug" class="partner">
      <a :href="partner.url" target="_blank" class="partner-logo-link">
        <PartnerLogo :partner="partner" />
      </a>
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <ContentRenderer :value="partner" class="description" />
        <RouterLink class="readMore button primary rounded" :to="`/partners/${partner.slug}`">Meer weten?</RouterLink>
      </div>
    </div>

    <hr class="dashed-line" />

    <h1>Reguliere partners</h1>
    <div class="regular-partners">
      <div v-for="partner in regularPartners || []" :key="partner.slug" class="regular-partner">
        <RouterLink :to="`/partners/${partner.slug}`" class="partner-logo">
          <a :href="partner.url" target="_blank">
            <PartnerLogo :partner="partner" />
          </a>
        </RouterLink>
        <RouterLink class="readMore button primary rounded indi-green-1" :to="`/partners/${partner.slug}`">
          {{ partner.title }}
        </RouterLink>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.dashed-line {
  border: none;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--indi-green-1),
    var(--indi-green-1) 30px,
    transparent 30px,
    transparent 60px
  );
}

#main-partner {
  margin: 0 auto 6em auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    > :first-child {
      grid-column: 1;
      justify-self: start;
    }

    @media screen and (max-width: #{$bp-tablet-md}) {
      grid-template-columns: 1fr;
      gap: 0;

      > :first-child {
        grid-column: 1;
        grid-row: 1;
      }

      .description {
        grid-column: 1;
        grid-row: 2;
      }
    }

    .description {
      text-align: left;
    }
  }
}

.partner {
  margin: 50px auto;
  max-width: 1600px;
  display: flex;
  gap: 8%;
  align-items: center;

  .partner-logo-link {
    display: block;
    flex: 0 0 30vw;
    max-width: 500px;
    width: 30vw;

    :deep(img) {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    flex-wrap: wrap;

    .partner-logo-link {
      flex: 0 0 auto;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
  }

  .description {
    text-align: left;
  }
}

.regular-partners {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 3em;
  width: 95em;
  margin: 3em auto;

  @media screen and (max-width: #{$bp-desktop-lg}) {
    width: 70em;
  }

  @media screen and (max-width: #{$bp-desktop-sm}) {
    width: 45em;
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    width: 20em;
    gap: 0;
  }

  .regular-partner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20em;

    .partner-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 8em;

      img {
        width: 20em;
        height: auto;
      }
    }
  }
}

.readMore {
  color: inherit;
  margin: 1em auto;
}
</style>
