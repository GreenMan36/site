<script setup lang="ts">
const { mainPartner, premiumPartners, regularPartners } = usePartners();

const { data: home } = await useAsyncData('home', () => queryCollection('home').first());

const carouselImages = ['/assets/images/DSC_2456.webp', '/assets/images/DSC_3982.webp', '/assets/images/Introkamp-53.webp'];

const mainPartners = computed(() => (mainPartner.value ? [mainPartner.value] : []));
const premiumPartnerList = computed(() => premiumPartners.value ?? []);
const regularPartnerList = computed(() => regularPartners.value ?? []);

const totalPartnersCount = computed(
  () => mainPartners.value.length + premiumPartnerList.value.length + regularPartnerList.value.length,
);

const allPartners = computed(() => [
  ...mainPartners.value.map((p) => ({ ...p, _tier: 'main' })),
  ...premiumPartnerList.value.map((p) => ({ ...p, _tier: 'premium' })),
  ...regularPartnerList.value.map((p) => ({ ...p, _tier: 'regular' })),
]);

const hasAnyPartners = computed(() => totalPartnersCount.value > 0);
</script>

<template>
  <div>
    <HeroSection class="hero" />
    <div class="page-body">
      <main class="content-main">
        <ClientOnly>
          <LazyImageCarousel :images="carouselImages" fit="contain" hydrate-on-visible />
          <template #fallback>
            <div class="carousel-fallback">
              <img
                alt="carousel fallback"
                :src="carouselImages[0]"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="1600"
                height="800"
              />
            </div>
          </template>
        </ClientOnly>
        <ContentRenderer v-if="home" :value="home" />
      </main>
      <aside class="content-aside">
        <Suspense>
          <LazyActivityCalendar hydrate-on-visible />
        </Suspense>
        <SocialSidebar />
      </aside>
    </div>

    <div v-if="hasAnyPartners" class="partners-section">
      <NuxtLink to="/partners" class="partners-inner">
        <p class="partners-label">Onze partners</p>
        <template v-if="totalPartnersCount <= 5">
          <div class="partners-row">
            <span
              v-for="partner in mainPartners"
              :key="`main-${partner.slug}`"
              class="partners-row__item partners-row__item--main"
            >
              <PartnerLogo :partner="partner" />
            </span>
            <span
              v-for="partner in premiumPartnerList"
              :key="`premium-${partner.slug}`"
              class="partners-row__item partners-row__item--premium"
            >
              <PartnerLogo :partner="partner" />
            </span>
            <span v-for="partner in regularPartnerList" :key="`regular-${partner.slug}`" class="partners-row__item">
              <PartnerLogo :partner="partner" />
            </span>
          </div>
        </template>
        <template v-else>
          <div class="partners-carousel">
            <div class="partners-carousel__track">
              <span
                v-for="(partner, i) in [...allPartners, ...allPartners]"
                :key="`carousel-${i}-${partner.slug}`"
                class="partners-row__item"
                :class="{
                  'partners-row__item--main': partner._tier === 'main',
                  'partners-row__item--premium': partner._tier === 'premium',
                }"
              >
                <PartnerLogo :partner="partner" />
              </span>
            </div>
          </div>
        </template>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.hero {
  padding-top: var(--nav-height);
}

.page-body {
  max-width: 1260px;
  margin: 0 auto;
  padding: 36px 24px 56px;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas: 'main aside';
  column-gap: 48px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'main'
      'aside';
    padding: 28px 16px 48px;
  }
}

.content-main {
  grid-area: main;
  min-width: 0;
}

.content-aside {
  grid-area: aside;
  position: sticky;
  top: calc(var(--nav-height) + 20px);
  padding-top: 4px;

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }
}

.partners-section {
  border-top: 1px solid rgba(var(--indi-blue-1-raw), 0.1);
  background: rgba(var(--indi-blue-1-raw), 0.06);
  padding: 32px 0;
  margin-bottom: 32px;
}

.partners-inner {
  display: block;
  max-width: 1300px;
  margin: 0 auto;
  padding: 28px 24px 32px;
  text-decoration: none;
  color: inherit;
}

.partners-label {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.7;
  margin: 0 0 20px;
}

.partners-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px 16px;
}

.partners-row__item {
  flex-shrink: 0;
  min-width: 220px;
  height: 96px;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid rgba(var(--indi-blue-1-raw), 0.2);
  background: rgba(var(--indi-blue-1-raw), 0.06);
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(img) {
    height: 48px;
    max-width: 150px;
    object-fit: contain;
    display: block;
  }
}

.partners-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);

  &:hover .partners-carousel__track {
    animation-play-state: paused;
  }
}

.partners-carousel__track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  animation: partner-ticker 30s linear infinite;

  @media (max-width: 900px) {
    animation: partner-ticker 20s linear infinite;
  }

  @media (max-width: 390px) {
    animation: partner-ticker 15s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 12px;
  }
}

@keyframes partner-ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 8px));
  }
}

.carousel-fallback {
  height: 400px;
  max-height: 50vw;
  width: 100%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}
</style>
