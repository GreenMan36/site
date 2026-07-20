<script setup lang="ts">
// Query dispuut collection
const { data: disputen } = await useAsyncData('dispuut', () => queryCollection('dispuut').all());
</script>

<template>
  <ContentContainer>
    <h1>Disputen</h1>
    <div v-for="(dispuut, index) in disputen || []" :key="dispuut._path" class="dispuut">
      <img :alt="`Logo ${dispuut.title}`" class="foto hover-scale" :src="dispuut.imgUrl" />
      <div class="dispuut-info">
        <h2>{{ dispuut.title }}</h2>
        <ContentRenderer :value="dispuut" />
        <a
          v-if="dispuut.website"
          :href="dispuut.website"
          target="_blank"
          rel="noopener noreferrer"
          class="button primary rounded"
        >
          Website
        </a>
        <a
          v-if="dispuut.instagram"
          :href="dispuut.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="button primary indi-green-1 rounded instagram-btn"
        >
          Instagram
        </a>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped>
.disputen {
  border-bottom: 3px solid var(--indi-blue-1);
  max-width: 1100px;
  margin: 0 auto;
  padding: 2em 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 5%;
  text-align: left;

  @media screen and (max-width: 944px) {
    grid-auto-flow: row;
  }

  & img {
    height: 100%;
    min-width: 320px;
    border-radius: 10px;
    background-image: linear-gradient(to bottom right, var(--indi-blue-1), var(--indi-blue-2));

    @media screen and (max-width: 944px) {
      max-width: 95%;
      margin: 0 auto;
    }
  }

  & h2 {
    margin-top: 0;
  }

  &:nth-child(odd) .dispuut-info {
    grid-column: 1;
    text-align: left;
  }

  &:last-child {
    border: none;
  }

  & .dispuut-info {
    border-radius: 10px;
    padding: 1em 2em;
    background-color: var(--secondary-background-color);

    @media screen and (max-width: 944px) {
      margin-top: 2em;
    }
  }
}

.instagram-btn {
  margin-left: 1em;
}
</style>
