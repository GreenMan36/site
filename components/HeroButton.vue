<script setup lang="ts">
type HeroButtonVariant = 'primary' | 'secondary';
type HeroButtonColor = 'blue-1' | 'blue-2' | 'blue-3' | 'green-1' | 'green-2' | 'green-3' | 'bluegreen-1' | 'bluegreen-2' | 'bluegreen-3';

const props = withDefaults(
  defineProps<{
    /** Target route or external URL. */
    to: string;
    /** `primary` fills the button (default); `secondary` outlines it. */
    variant?: HeroButtonVariant;
    /** Button colour; `blue-1` is the base `.button` look. */
    color?: HeroButtonColor;
    /** Renders nothing while keeping the node in the content file (e.g. a seasonal CTA). */
    hidden?: boolean;
  }>(),
  { variant: 'primary', color: 'blue-1', hidden: false },
);

const classes = computed(() => ['button', props.variant, 'rounded', props.color === 'blue-1' ? '' : `indi-${props.color}`]);
</script>

<template>
  <NuxtLink v-if="!hidden" :to="to" :class="classes">
    <MDCSlot :use="$slots.default" unwrap="p" />
  </NuxtLink>
</template>
