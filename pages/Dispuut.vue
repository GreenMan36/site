<script setup lang="ts">
/// <reference types="vite-svg-loader" />

// Query dispuut collection
const { data: disputen } = await useAsyncData('dispuut', () => queryCollection('dispuut').all());
</script>

<template>
  <ContentContainer>
    <h1>Disputen</h1>
    <p id="intro"></p>
    <div v-for="dispuut in disputen || []" :key="dispuut._path" class="dispuut">
      <img alt="dispuutfoto" class="foto" :src="dispuut.imgUrl" />
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
          class="button primary indi-green-1 rounded"
          style="margin-left: 1em"
        >
          Instagram
        </a>
      </div>
      <div v-if="index % 2 === 0" class="spacer"></div>
    </div>
  </ContentContainer>
</template>

<style scoped>
.dispuut {
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
    transition: transform 0.2s;
    background-image: linear-gradient(to bottom right, var(--indi-blue-1), var(--indi-blue-2));
    @media screen and (max-width: 944px) {
      max-width: 95%;
      margin: 0 auto;
    }
  }

  & img:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
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

  .dispuut-info {
    border-radius: 10px;
    padding: 1em 2em;
    background-color: var(--secondary-background-color);
    @media screen and (max-width: 944px) {
      margin-top: 2em;
    }
  }
}
</style>
