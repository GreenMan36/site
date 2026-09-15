<script setup lang="ts">
import HeroCircuit from '@/assets/icons/hero.svg?component';

// The hero's look is fixed here on purpose: ::hero-section exposes only the title
// and buttons, so these are not props (they were never edited).
</script>

<template>
  <div class="background-view">
    <HeroCircuit class="HeroCircuit" />
  </div>
</template>

<style scoped>
/* Inner SVG nodes come from the child component, so :deep() is required. */
.HeroCircuit {
  scale: 4;
  position: absolute;
  width: 100%;
  height: 100%;
}

.HeroCircuit :deep(path),
.HeroCircuit :deep(rect),
.HeroCircuit :deep(circle),
.HeroCircuit :deep(polyline) {
  stroke: var(--pulse, var(--pcb-trace-color));
}

/* Modules are the top-level g siblings carrying stroke-dasharray (defs is
not a g, so nth-of-type 1-5 are the five pulse groups). Varied triplet
assignment so consecutive pulses read as alternating, not uniform. */
.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(1)) {
  --pulse: var(--indi-blue-1);
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(2)) {
  --pulse: var(--indi-blue-green-1);
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(3)) {
  --pulse: var(--indi-green-1);
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(4)) {
  --pulse: var(--indi-blue-1);
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(5)) {
  --pulse: var(--indi-blue-green-1);
}

.HeroCircuit :deep(g[stroke-dasharray]) {
  animation-name: hero-trace-flow;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.background-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--hero-bg-color);
}

@media (prefers-reduced-motion: reduce) {
  .HeroCircuit :deep(g[stroke-dasharray]) {
    animation: none;
    stroke-dashoffset: 0;
  }
}

.background-view .HeroCircuit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Dash period is the dasharray sum in hero.svg (8+960+24+960+16+400=2368).
Spanning exactly 3 periods keeps the loop restart seamless. */
@keyframes hero-trace-flow {
  from {
    stroke-dashoffset: 7104;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
