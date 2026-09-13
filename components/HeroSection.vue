<script setup lang="ts">
import logo from '@/components/LogoElement.vue';
import HeroBackground from './HeroBackground.vue';
</script>

<template>
  <div class="hero">
    <div class="bg-container">
      <HeroBackground />
    </div>
    <div class="hero-content">
      <logo />
      <h1>
        <!-- MDC's compiler rewrites MDCSlot into a slot outlet (hence `name`); the
             standalone component reads `use`. `unwrap="p"` drops markdown's <p>. -->
        <MDCSlot name="title" :use="$slots.title" unwrap="p" />
      </h1>
      <div class="hero-buttons">
        <slot name="buttons" />
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

/* Markdown `**bold**` in the title slot renders as <strong>; keep the hero's
   extra-bold weight. Flat selector: nesting it under h1 broke the scope rewrite. */
.hero-content :deep(h1 strong) {
  font-weight: 900;
}
</style>
