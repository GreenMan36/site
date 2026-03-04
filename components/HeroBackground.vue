<script setup lang="ts">
import HeroCircuit from '@/assets/icons/hero.svg?component';
</script>

<template>
  <div class="background-view">
    <HeroCircuit class="HeroCircuit" style="scale: 4; position: absolute; top: 0; left: 0; width: 100%; height: 100%" />
  </div>
</template>

<style lang="scss">
.HeroCircuit {
  path,
  rect,
  circle {
    stroke: var(--pcb-trace-color);
  }
}

.background-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--hero-bg-color);

  .HeroCircuit {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
