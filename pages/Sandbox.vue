<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import TestSvg from '@/components/TestSvg.vue';
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <p>A sandbox to test new features</p>
    <TestSvg />
  </ContentContainer>
</template>

<style scoped lang="scss">
p {
  color: red;
}
</style>
