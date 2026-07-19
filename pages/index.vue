<script setup lang="ts">
const { mainPartner, premiumPartners, regularPartners } = usePartners();

const images = ['/assets/images/DSC_2456.webp', '/assets/images/DSC_3982.webp', '/assets/images/Introkamp-53.webp'];

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
          <LazyImageCarousel :images="images" fit="contain" hydrate-on-visible />
          <template #fallback>
            <div class="carousel-fallback">
              <img
                alt="carousel fallback"
                :src="images[0]"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width="1600"
                height="800"
              />
            </div>
          </template>
        </ClientOnly>

        <section class="text-block">
          <h2>Over Indicium</h2>
          <p>
            Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht. We organiseren het hele jaar door
            activiteiten zoals bedrijfsbezoeken, kroegcolleges, gastcolleges, lunchlezingen en nog veel meer over
            allerlei verschillende onderwerpen. We organiseren natuurlijk ook activiteiten voor gezelligheid! Kom eens
            langs op onze borrels, LAN-party's of bij iets anders!
          </p>
          <NuxtLink to="/over-indicium" class="inline-link">Lees meer over Indicium →</NuxtLink>
        </section>

        <section class="text-block">
          <h2>Lid zijn is meedoen</h2>
          <p>
            Een hoop activiteiten organiseren we voor iedereen, maar als lid krijg je natuurlijk veel meer voordelen! Je
            krijgt dan korting bij activiteiten of je wordt uitgenodigd voor activiteiten die exclusief voor leden zijn.
            Ook kunnen we je helpen met het zoeken van een stage en kan je er altijd terecht als je ergens niet uitkomt.
          </p>
          <NuxtLink to="/lid-worden" class="inline-link">Word lid →</NuxtLink>
        </section>

        <section class="text-block">
          <h2>Commissies</h2>
          <p>
            Lijkt je het leuk om de vereniging te helpen door het organiseren van activiteiten zoals borrels, feestjes,
            gastcolleges, lunchlezingen, reizen? Of wil je je programmeerskills verbeteren? Neem eens een kijkje bij
            onze commissies — enthousiaste leden die de vereniging draaiende houden.
          </p>
          <NuxtLink to="/commissies" class="inline-link">Bekijk de commissies →</NuxtLink>
        </section>
      </main>

      <aside class="content-aside">
        <LazyActivityCalendar hydrate-on-visible />
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

/* Centered max-width container + 2-column grid (content | aside)
 * The container caps total width so there's no squishing at mid-sizes */
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

  :deep(.title) {
    margin-top: 0;
  }

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
    /* Translate half of the track, accounting for the 16px gap (8px offset) */
    transform: translateX(calc(-50% - 8px));
  }
}

.text-block {
  padding: 24px 0 12px;

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

  .inline-link {
    display: inline-block;
    margin-top: 0.5rem;
    font-weight: 600;
    color: var(--indi-blue-1);
    filter: brightness(0.72);
    text-underline-offset: 2px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      filter: brightness(0.58);
    }
  }
}

html[data-theme='dark'] .inline-link {
  filter: brightness(1.15);
}

html[data-theme='dark'] .inline-link:hover {
  filter: brightness(1.3);
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
