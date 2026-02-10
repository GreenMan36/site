<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import JobOffers from '@/components/JobOffers.vue';

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

// Get logos
const mainPartnerLogo = usePartnerLogo(mainPartner.value);
const premiumLogos = computed(() =>
  (premiumPartners.value || []).map((p) => ({ partner: p, logo: usePartnerLogo(p) })),
);
const regularLogos = computed(() =>
  (regularPartners.value || []).map((p) => ({ partner: p, logo: usePartnerLogo(p) })),
);

// log all partners to console for debugging
watch(
  [mainPartner, premiumPartners, regularPartners],
  () => {
    console.log('Main Partner:', mainPartner.value);
    console.log('Premium Partners:', premiumPartners.value);
    console.log('Regular Partners:', regularPartners.value);
  },
  { immediate: true },
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
          <img class="partner-logo" :src="mainPartnerLogo" :alt="'Logo' + mainPartner.title" />
        </a>
        <img v-else class="partner-logo" :src="mainPartnerLogo" :alt="'Logo' + mainPartner.title" />
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
    <div v-for="{ partner, logo } in premiumLogos" :key="partner.slug" class="partner">
      <a :href="partner.url" target="_blank">
        <img class="partner-logo" :src="logo.value" :alt="'Logo' + partner.title" />
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
      <div v-for="{ partner, logo } in regularLogos" :key="partner.slug" class="regular-partner">
        <RouterLink :to="`/partners/${partner.slug}`" class="partner-logo">
          <a :href="partner.url" target="_blank">
            <img :src="logo.value" :alt="'Logo' + partner.title" />
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

    @media screen and (max-width: #{$bp-tablet-md}) {
      grid-template-columns: 1fr;
      gap: 0;
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

  .partner-logo {
    max-width: 500px;
    width: 30vw;
    height: auto;
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    flex-wrap: wrap;

    .partner-logo {
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
      img {
        width: 20em;
        height: auto;
      }
    }
  }
}

.readMore {
  font-size: large;
  text-decoration: none;
  color: inherit;
  margin: 1em auto;
  padding: 10px;
  background-color: rgb(var(--indi-blue-1));
  border-radius: 0.5em;
}
</style>
