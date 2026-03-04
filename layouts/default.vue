<script setup lang="ts">
import NavDesktop from '@/layouts/Nav.vue';
import FooterMenu from '@/layouts/Footer.vue';

const NavMobile = defineAsyncComponent(() => import('@/layouts/NavMobile.vue'));
const isMobile = useMediaQuery('(max-width: 944px)');
</script>

<template>
  <div>
    <NavDesktop />
    <NavMobile v-if="isMobile" />
    <div class="page-content">
      <slot />
    </div>
    <FooterMenu />
  </div>
</template>

<style lang="scss">
body {
  .nav {
    display: block;
  }

  .mobile-nav {
    display: none;
  }
  background-color: var(--root-background-color);
}

@media screen and (max-width: #{$bp-tablet-lg}) {
  body {
    &::-webkit-scrollbar {
      width: 1em;
    }

    .nav {
      display: none !important;
    }

    .mobile-nav {
      display: block !important;
    }
  }
}

#app {
  width: 100vw;
  width: 100dvw;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .page-content {
    flex-grow: 1;
  }
}
</style>
