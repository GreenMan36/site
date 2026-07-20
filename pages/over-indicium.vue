<script setup lang="ts">
useSeoMeta({
  title: 'Over Indicium',
  description: 'Dé studievereniging voor HBO-ICT van Hogeschool Utrecht',
});

const { data: page } = await useAsyncData('about', () => queryCollection('about').first());
</script>

<template>
  <ContentContainer>
    <h1>Over Indicium</h1>
    <ContentRenderer v-if="page" :value="page" />
  </ContentContainer>
</template>
