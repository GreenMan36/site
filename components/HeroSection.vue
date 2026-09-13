<script setup lang="ts">
import logo from '@/components/LogoElement.vue';
import HeroBackground from './HeroBackground.vue';

// All props are MDX-editable via ::hero-section, e.g.
//   ::hero-section
//   ---
//   title: Wij zijn dé **studie**vereniging
//   buttons:
//     - label: Word lid
//       url: /lid-worden
//       color: green-1
//   ---
//   ::
// Omitting them keeps the defaults below (identical to the hardcoded hero).
type HeroButtonVariant = 'primary' | 'secondary';
type HeroButtonColor = 'blue-1' | 'blue-2' | 'blue-3' | 'green-1' | 'green-2' | 'green-3' | 'bluegreen-1' | 'bluegreen-2' | 'bluegreen-3';

interface HeroButton {
  label: string;
  url: string;
  /** `primary` fills the button (default); `secondary` outlines it. */
  variant?: HeroButtonVariant;
  /** Button colour; `blue-1` is the base `.button` look. */
  color?: HeroButtonColor;
}

const props = withDefaults(
  defineProps<{
    /** Headline text. Wrap a word in `**double asterisks**` to render it extra-bold. */
    title?: string;
    /** Call-to-action buttons under the headline. */
    buttons?: HeroButton[];
    /** Passthrough to HeroBackground; unset falls back to the themed colors. */
    heroBackgroundColor?: string;
    heroTraceColor?: string;
    heroPrimaryColor?: string;
    heroSecondaryColor?: string;
    heroTertiaryColor?: string;
    heroAnimated?: boolean;
    /** Seconds per dash-flow loop; higher is slower. MDC delivers it as a string, coerced below. */
    heroFlowDurationSeconds?: number | string;
  }>(),
  {
    title: 'Wij zijn dé **studie**vereniging voor HBO-ICT van Hogeschool Utrecht',
    buttons: () => [
      { label: 'Introductiekamp', url: '/intro' },
      { label: 'Word lid', url: '/lid-worden', color: 'green-1' },
      { label: 'Quick Links', url: '/links', variant: 'secondary', color: 'bluegreen-1' },
    ],
    heroAnimated: false,
    heroFlowDurationSeconds: 30,
  },
);

// MDC attribute values arrive as strings, and HeroBackground's Number.isFinite guard
// would reject them and silently fall back to its own 12s default.
const flowDurationSeconds = computed(() => Number(props.heroFlowDurationSeconds) || 30);

// split() with a capture group alternates plain/emphasised segments.
const titleTokens = computed(() =>
  props.title.split(/\*\*(.+?)\*\*/g).map((text, index) => ({ text, emphasis: index % 2 === 1 })),
);

function buttonClasses({ variant = 'primary', color = 'blue-1' }: HeroButton) {
  return ['button', variant, 'rounded', color === 'blue-1' ? '' : `indi-${color}`];
}
</script>

<template>
  <div class="hero">
    <div class="bg-container">
      <HeroBackground
        :background-color="heroBackgroundColor"
        :trace-color="heroTraceColor"
        :primary-color="heroPrimaryColor"
        :secondary-color="heroSecondaryColor"
        :tertiary-color="heroTertiaryColor"
        :animated="heroAnimated"
        :flow-duration-seconds="flowDurationSeconds"
      />
    </div>
    <div class="hero-content">
      <logo />
      <h1>
        <span v-for="(token, index) in titleTokens" :key="index" :class="{ 'extra-bold': token.emphasis }">{{ token.text }}</span>
      </h1>
      <div class="hero-buttons">
        <NuxtLink v-for="(button, index) in buttons" :key="index" :to="button.url" :class="buttonClasses(button)">
          {{ button.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  position: relative;
  width: inherit;
  overflow: hidden;
  padding-top: var(--nav-height);

  .bg-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .hero-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 92px 0;
    max-width: 100%;
    z-index: 1;

    h1 {
      max-width: 800px;
      padding: 0 16px;
      font-weight: 500;

      @media screen and (max-width: 1120px) {
        font-size: 2em;
      }

      @media screen and (max-width: 562px) {
        font-size: 1.5em;
      }

      @media screen and (max-width: 414px) {
        font-size: 1.2em;
      }
    }

    .button.primary.rounded,
    .button.secondary.rounded {
      font-size: 1.1rem;
      letter-spacing: 0.06rem;
      text-decoration: none;
    }

    & .hero-buttons {
      margin-top: 1rem;
      & > * {
        margin: 0.5em;
      }
    }
  }
}
</style>
