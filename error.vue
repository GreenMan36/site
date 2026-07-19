<script setup lang="ts">
const route = useRoute();
const code = (route.query.code as string) || '406';
const error = (route.query.error as string) || 'Geen idee wat er mis ging ';

const imageurl = 'https://httpcats.com/' + code + '.jpg';
</script>

<template>
  <ContentContainer>
    <ErrorDisplay>
      <div style="display: grid; justify-content: center">
        <img :src="imageurl" :alt="`HTTP Error ${code}`" style="height: 400px; max-height: 50vw" />
      </div>
      <h1>{{ error }}</h1>
    </ErrorDisplay>
  </ContentContainer>
</template>

<style scoped>
svg {
  width: 300px;
  height: 300px;
}

.face {
  font-size: 150px;
}
</style>
