<script setup lang="ts">
// Mobile shell around the shared MenuItem tree: hamburger + slide-in panel.
// Drill-down trail: trail[depth] holds the active item url at that depth.
const menuOpen = ref(false);
const trail = ref<string[]>([]);

provide('navTrail', trail);
provide('navDrillTo', (depth: number, url: string) => {
  trail.value[depth] = url;
  trail.value.length = depth + 1;
});
provide('navBackTo', (depth: number) => {
  trail.value.length = depth;
});

watch(menuOpen, (open) => {
  if (!open) trail.value = [];
});

// Same query + key as NavDesktop, so SSG/hydration share one payload.
const { data: navData } = await useAsyncData('navigation', () => queryCollection('navigation').first());
const items = navData.value?.items || [];

const router = useRouter();
router.afterEach(() => {
  menuOpen.value = false;
});
</script>

<template>
  <nav class="mobile-nav">
    <div class="mobile-container flex">
      <NavLogo />
      <button
        type="button"
        class="nav-toggle"
        :class="{ rotated: menuOpen }"
        :aria-expanded="menuOpen"
        aria-label="Hoofdmenu openen of sluiten"
        @click="menuOpen = !menuOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          stroke-width="2"
          stroke-linecap="square"
          aria-hidden="true"
        >
          <line x1="7.5" y1="10" x2="22.5" y2="10" />
          <line x1="7.5" y1="15" x2="22.5" y2="15" />
          <line x1="7.5" y1="20" x2="22.5" y2="20" />
        </svg>
      </button>
    </div>

    <div class="mobile-menu" :class="{ visible: menuOpen }" :inert="!menuOpen">
      <ul class="menu-root">
        <MenuItem v-for="(item, index) in items" :key="`${index}-${item.title}-${item.url}`" :item="item" />
      </ul>
      <div class="mobile-menu-shadow" :class="{ hidden: !menuOpen }" @click="menuOpen = false" />
    </div>
  </nav>
</template>

<style scoped>
.mobile-nav {
  --navbar-height: 16vw;
  --navbar-max-height: 68px;
  --transition-time: 0.2s;

  /* One breakpoint for the whole nav system (was 768/944/945 across files). */
  @media screen and (min-width: 769px) {
    display: none;
  }
}

.mobile-container.flex {
  background-color: var(--root-background-color);
  z-index: 100;
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: var(--navbar-height);
  max-height: var(--navbar-max-height);
  box-shadow: inset 0 -2px 0 var(--indi-blue-1);
}

.nav-toggle {
  display: flex;
  cursor: pointer;
  stroke: var(--text-color);
  background: none;
  border: none;
  padding: 0 10px;
  margin-left: auto;

  & svg {
    display: block;
    width: 16vw;
    max-width: 68px;
    height: 16vw;
    max-height: 68px;
    transition: var(--transition-time) ease-in-out;
  }

  &.rotated svg {
    transform: rotate(90deg);
  }
}

.mobile-menu {
  visibility: hidden;
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  top: clamp(0.01px, 16vw, 68px);
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;

  &.visible {
    visibility: visible;
  }
}

.menu-root {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--root-background-color);
  border-top: 2px solid var(--indi-blue-1);
}

.mobile-menu-shadow {
  position: fixed;
  z-index: -1;
  background-color: hsla(0, 0%, 0%, 0.9);
  inset: 0;
  transition: opacity var(--transition-time) ease-in-out;
  opacity: 1;

  &.hidden {
    opacity: 0;
  }
}
</style>
