<script setup lang="ts">
const [{ data: mainPartner }, { data: premiumPartners }, { data: regularPartners }] = await Promise.all([
  useAsyncData('home-mainPartner', () => queryCollection('partners').where('tier', '=', 'main').first()),
  useAsyncData('home-premiumPartners', () =>
    queryCollection('partners').where('tier', '=', 'premium').order('order', 'ASC').all(),
  ),
  useAsyncData('home-regularPartners', () =>
    queryCollection('partners').where('tier', '=', 'regular').order('order', 'ASC').all(),
  ),
]);

const images = ['/assets/images/DSC_2456.webp', '/assets/images/DSC_3982.webp', '/assets/images/Introkamp-53.webp'];

function gotoPartners() {
  return navigateTo('/partners');
}
</script>

<template>
  <div>
    <HeroSection class="hero" />
    <div class="split-container">
      <div class="left">
        <ClientOnly>
          <!-- Only render the carousel when visible -->
          <LazyImageCarousel :images="images" fit="contain" hydrate-on-visible />
          <template #fallback>
            <!-- Show first image as fallback -->
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
        <div class="container" data-v-4413e4a8="">
          <div class="text-block text-center contained" data-v-4413e4a8="">
            <h2 style="margin-top: 0.3em">Over Indicium</h2>
            <p>
              Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht. We organiseren het hele jaar door
              activiteiten zoals bedrijfsbezoeken, kroegcolleges, gastcolleges, lunchlezingen en nog veel meer over
              allerlei verschillende onderwerpen. We organiseren natuurlijk ook activiteiten voor gezelligheid! Kom eens
              langs op onze borrels, LAN-party's of bij iets anders!
            </p>
          </div>
        </div>

        <div class="container" data-v-4413e4a8="">
          <div class="text-block text-center contained" data-v-4413e4a8="">
            <h2>Lid zijn is meedoen!</h2>
            <p>
              Een hoop activiteiten organiseren we voor iedereen, maar als lid krijg je natuurlijk veel meer voordelen!
              Je krijgt dan korting bij activiteiten of je wordt uitgenodigd voor activiteiten die exclusief voor leden
              zijn. Ook kunnen we je helpen met het zoeken van een stage en kan je er altijd terecht als je ergens niet
              uitkomt. Dus meld je aan als lid!
            </p>
          </div>
          <div class="text-block text-center contained" data-v-4413e4a8="">
            <h2>Commissies?</h2>
            <p>
              Lijkt je het leuk om de vereniging te helpen door het organiseren van activiteiten zoals borrels,
              feestjes, gastcolleges, lunchlezingen, reizen? Of wil je je programmeerskills verbeteren? Neem eens een
              kijkje bij onze commissies. Deze bestaan uit enthousiaste leden die helpen om de vereniging draaiende te
              houden. Wil je meer informatie of wil je weten wat voor commissies er allemaal zijn? Kijk dan op onze
              commissie pagina.
            </p>
          </div>
        </div>
      </div>

      <div class="right">
        <LazyActivityCalendar hydrate-on-visible />

        <h2>Partners</h2>
        <div class="partner-container" @click="gotoPartners">
          <PartnerLogo
            v-if="mainPartner"
            :partner="mainPartner"
            class="partner-logo"
            style="height: 100px; margin-top: 0"
          />
          <PartnerLogo
            v-for="partner in premiumPartners || []"
            :key="`premium-${partner.slug}`"
            :partner="partner"
            class="partner-logo"
          />
          <PartnerLogo
            v-for="partner in regularPartners || []"
            :key="`regular-${partner.slug}`"
            :partner="partner"
            class="partner-logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  padding-top: var(--nav-height);
}

svg {
  width: 300px;
  height: 300px;
}
.split-container {
  position: relative;
  padding-top: 32px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(to top, rgba(grey, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
  }

  .left {
    max-width: 800px;
  }

  .right {
    padding: 0 24px;
    width: 400px;

    .partner-container {
      cursor: pointer;
      border-radius: 4px;
      padding: 12px;
      background-color: var(--secondary-background-color);
    }

    :deep(img) {
      object-fit: contain;
      margin: 16px;
      height: 66px;
      max-width: 300px;
    }
  }
}

.carousel-fallback {
  height: 400px;
  max-height: 50vw;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.partner-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
