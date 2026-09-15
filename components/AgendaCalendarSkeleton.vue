<script setup lang="ts">
// Loading placeholder for ActivityCalendar. Both loading paths use this component — the
// prerendered ClientOnly fallback and the in-flight `pending` branch — because they must
// be identical: when one rendered pagination + buttons and the other only rows, the
// widget visibly collapsed the moment hydration swapped them.
//
// Geometry and looks mirror the loaded list: the date badge keeps the real `.date`
// background (the same green, same 63x75 box), each row keeps `.event`'s 99px box, and
// the lines stand in for the title/time/location the row will get.
defineProps<{ rows: number }>();
</script>

<template>
  <div v-for="index in rows" :key="index" class="skeleton-row" aria-hidden="true">
    <div class="skeleton-date"></div>
    <div class="skeleton-details">
      <p class="skeleton-line"></p>
      <p class="skeleton-line skeleton-line--short"></p>
      <p class="skeleton-line skeleton-line--shortest"></p>
    </div>
  </div>
</template>

<style scoped>
.skeleton-row {
  display: grid;
  grid-template-columns: 63px 1fr;
  text-align: left;
  line-height: 1.7;
  min-height: 99.2px;
}

/* Same box and colour as the real `.event .date` badge, so the placeholder reads as the
   date slot rather than an anonymous block. */
.skeleton-date {
  min-height: 75.5px;
  padding: 4px;
  border-radius: 5px;
  align-self: baseline;
  background-color: var(--indi-green-2);
}

.skeleton-details {
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.skeleton-line {
  margin: 0;
  height: 0.9rem;
  width: 85%;
  border-radius: 6px;
  background-color: color-mix(in srgb, var(--text-color) 18%, transparent);
}

.skeleton-line--short {
  width: 55%;
  margin-top: 0.4rem;
}

/* The loaded row renders three lines: title, time, location. */
.skeleton-line--shortest {
  width: 40%;
  margin-top: 0.4rem;
}
</style>
