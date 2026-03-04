<script setup lang="ts">
const images = ['/assets/images/Karten-20.webp', '/assets/images/Poolen-12.webp', '/assets/images/DSC_2852.webp'];
</script>

<template>
  <ContentContainer>
    <div class="carousel">
      <ClientOnly>
        <LazyImageCarousel
          :images="images"
          alt="Over Indicium slider"
          :slides-per-view="1.5"
          align="center"
          height="32em"
          max-height="32em"
          fit="contain"
          hydrate-on-visible
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
    <div class="text-container">
      <h2>Over Indicium</h2>
      <p>
        Indicium is de studievereniging voor studenten van het Institute for ICT aan de Hogeschool Utrecht. De
        vereniging organiseert naast informele activiteiten zoals poolen, bowlen, karten en feestjes met andere
        verenigingen ook verdiepende activiteiten in de ICT branche zoals lezingen, workshops en inhousedagen. Daarnaast
        biedt Indicium ook netwerkmogelijkheden voor studenten, waar ze in contact kunnen komen met bedrijven en
        professionals uit de branche. De vereniging heeft ook een actieve rol in de organisatie van evenementen, zoals 2
        maal per jaar een studiereis naar beurzen door Europa en hackathons.
      </p>
      <h2>Introkamp</h2>
      <p>
        Verreweg een van de leukste activiteiten van het jaar is het introkamp vlak voor het begin van het studiejaar.
        Tijdens het introkamp organiseren de leden van de vereniging activiteiten die gericht zijn op teambuilding en
        gezelligheid. Tijdens het introkamp maak je door verschillende activiteiten kennis met de stad Utrecht. Daarna
        verhuist de gezelligheid naar een evenementenlocatie in de buurt van de stad waar de gezelligheid verder gaat
        door middel van uitdagende activiteiten, teambuilding en een leuk feestje. Kortom, het introkamp is de beste
        manier om je studententijd in Utrecht te beginnen en vrienden te maken voor de rest van je studie.
      </p>
      <h2>Hoe wij zijn ontstaan</h2>
      <p>
        "Er moeten toch ook ICT-ers zijn die het wel leuk vinden om gezellige dingen te doen”. Dit waren de wijze
        woorden van onze voorzitter William die aan het praten was tegen Nigel onze secretaris. Diezelfde dag werd
        Olivier door William benaderd of hij het ook leuk lijkt om ICT weer gezellig te maken. Het enige wat er nog
        ontbrak was iemand die zich goed kon vinden in de cijfers. De zoektocht duurde niet lang. We hadden al snel
        iemand gevonden die uitstekend kan boekhouden en zo met Sander onze penningmeester erbij hadden we een hecht
        bestuur gevormd.
      </p>
    </div>
  </ContentContainer>
</template>

<style scoped>
.content-container {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1200px;
}

.text-container {
  max-width: 800px;
  margin: 40px auto;
}

.carousel {
  margin: 0 auto;
  margin-top: 2em;
  height: 32em;
  max-height: 32em;
  max-width: 1200px;
}

.carousel-fallback {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
</style>
