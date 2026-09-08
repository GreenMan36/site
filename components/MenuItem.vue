<script setup lang="ts">
interface MenuItem {
  title: string;
  url: string;
  children?: MenuItem[];
}

const props = defineProps<{
  item: MenuItem;
  depth?: number;
}>();

const depth = props.depth ?? 0;
const isExternal = props.item.url.startsWith('http');

// Mobile drill-down trail (provided by NavMobile; absent on desktop).
const trail = inject<string[]>('navTrail', ref([]));
const drillTo = inject<(depth: number, url: string) => void>('navDrillTo', () => {});
const backTo = inject<(depth: number) => void>('navBackTo', () => {});
const isActive = computed(() => trail.value[depth] === props.item.url);

function getLinkClass(url: string) {
  return {
    'button secondary rounded': url === '/links',
    'button primary rounded': url === '/lid-worden',
    'button rounded': url.startsWith('http'),
  };
}
</script>

<template>
  <li class="menu-item" :data-depth="depth % 3">
    <RouterLink v-if="!isExternal" :to="item.url" class="navlink" :class="getLinkClass(item.url)">
      {{ item.title }}
    </RouterLink>
    <a v-else :href="item.url" target="_blank" rel="noopener" class="navlink" :class="getLinkClass(item.url)">
      {{ item.title }}
    </a>
    <button
      v-if="item.children"
      type="button"
      class="submenu-toggle"
      :aria-expanded="isActive"
      :aria-label="`Submenu ${isActive ? 'sluiten' : 'openen'}: ${item.title}`"
      @click="drillTo(depth, item.url)"
    >
      <span aria-hidden="true" />
    </button>
    <ul v-if="item.children" class="dropdown">
      <MenuItem v-for="(child, index) in item.children" :key="`${index}-${child.title}-${child.url}`" :item="child" :depth="depth + 1" />
    </ul>
    <!-- Mobile drill-down panel: slides over when this item is the trail head. -->
    <div v-if="item.children" class="drill-panel" :class="{ active: isActive }" :data-depth="depth % 3" :inert="!isActive">
      <button type="button" class="drill-back" @click="backTo(depth)" aria-label="Terug">
        <span aria-hidden="true">‹</span> {{ item.title }}
      </button>
      <ul>
        <MenuItem v-for="(child, index) in item.children" :key="`p-${index}-${child.title}-${child.url}`" :item="child" :depth="depth + 1" />
      </ul>
    </div>
  </li>
</template>

<style scoped>
/* One recursive tree, two presentations. Desktop (>768px): anchored dropdowns
   opened by :hover/:focus-within. Mobile: drill-down panels sliding in from
   the right, one level per panel. Anchor pattern: shared `anchor-name` +
   `anchor-scope` per item, explicit `position-anchor` on dropdowns (implicit
   auto does not reach position:fixed descendants). */

.menu-item {
  anchor-name: --submenu-anchor;
  /* Scope the shared name to this subtree: each dropdown binds its own
     item's anchor instead of the last same-named anchor in source order. */
  anchor-scope: --submenu-anchor;
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item .navlink {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--text-color);
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}

/* Glyph arrows without v-html: direction follows nesting, not JS measurement. */
.menu-item:has(> .dropdown) > .navlink::after {
  content: '▾';
  font-size: 0.6rem;
  margin-left: 0.5rem;
}

.menu-item .navlink.button {
  height: unset;
  width: max-content;
}

.submenu-toggle,
.drill-panel {
  display: none;
}

/* ---------- Desktop dropdowns ---------- */
@media screen and (min-width: 769px) {
  .dropdown {
    display: none;
    /* Fixed escapes ancestor overflow/clipping and the li box. */
    position: fixed;
    /* Explicit binding: implicit (auto) anchoring does not reach
       position:fixed descendants; scope keeps each dropdown on its own item. */
    position-anchor: --submenu-anchor;
    /* Below the anchor, left edges flush; flips when room runs out
       (replaces the old getBoundingClientRect measuring). */
    position-area: block-end center;
    /* Tile is the anchor column; start = flush with the anchor's left edge. */
    justify-self: start;
    position-try-fallbacks: flip-block;
    background: var(--root-background-color);
    min-width: 200px;
    width: max-content;
    height: fit-content;
    z-index: 1;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .dropdown .dropdown {
    position-area: inline-end center;
    /* Top edge flush with the parent row, like the old top:0. */
    align-self: start;
    position-try-fallbacks: flip-inline, flip-block;
  }

  /* No anchor positioning (older browsers): today's static placement. */
  @supports not (position-area: block-end) {
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
    }

    .dropdown .dropdown {
      top: 0;
      left: 100%;
    }
  }

  .menu-item:hover > .dropdown,
  .menu-item:focus-within > .dropdown {
    display: block;
  }

  .dropdown .menu-item:has(> .dropdown) > .navlink::after {
    content: '▸';
  }
}

/* ---------- Depth colors (both presentations) ---------- */
[data-depth='0'] > .dropdown,
[data-depth='0'].drill-panel.active {
  box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);
}

[data-depth='0'] .menu-item a:hover,
[data-depth='0'] .menu-item a:focus-visible {
  background-color: var(--indi-blue-green-1);
}

[data-depth='1'] > .dropdown,
[data-depth='1'].drill-panel.active {
  box-shadow: inset 0 0 0 2px var(--indi-green-1);
}

[data-depth='1'] .menu-item a:hover,
[data-depth='1'] .menu-item a:focus-visible {
  background-color: var(--indi-green-1);
}

[data-depth='2'] > .dropdown,
[data-depth='2'].drill-panel.active {
  box-shadow: inset 0 0 0 2px var(--indi-blue-1);
}

[data-depth='2'] .menu-item a:hover,
[data-depth='2'] .menu-item a:focus-visible {
  background-color: var(--indi-blue-1);
}

.menu-item a:hover:not(.button),
.menu-item a:focus-visible:not(.button) {
  color: white;
  text-decoration: none;
  background-color: var(--indi-blue-1);
}

/* ---------- Mobile drill-down ---------- */
@media screen and (max-width: 768px) {
  .menu-item {
    height: auto;
    min-height: 50px;
    flex-wrap: wrap;
  }

  .menu-item .navlink {
    flex: 1;
    justify-content: flex-start;
    padding: 1em;
  }

  .menu-item:has(> .dropdown) > .navlink::after {
    content: none;
  }

  /* CTA pills become uniform rows. */
  .menu-item .navlink.button {
    width: 100%;
    border-radius: 0;
    border: none;
    margin: 0;
    text-align: left;
    background: transparent;
    color: var(--text-color);
  }

  .dropdown {
    display: none;
  }

  .submenu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5em;
    align-self: stretch;
    background: none;
    border: none;
    border-left: 1px solid currentcolor;
    cursor: pointer;
    color: inherit;
    font-size: inherit;
  }

  .submenu-toggle > span::before {
    content: '▸';
  }

  /* Level color language on mobile rows (mirrors the depth borders). */
  .menu-root > .menu-item {
    border-bottom: 1px solid var(--indi-blue-1);
  }

  .drill-panel ul .menu-item {
    border-bottom: 1px solid var(--indi-blue-green-1);
  }

  .drill-panel {
    display: block;
    position: fixed;
    top: clamp(0.01px, 16vw, 68px);
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    background-color: var(--root-background-color);
    visibility: hidden;
    transform: translateX(100%);
    transition:
      transform 0.2s ease-in-out,
      visibility 0.2s;
  }

  .drill-panel.active {
    visibility: visible;
    transform: none;
  }

  .drill-panel > ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .drill-back {
    display: flex;
    align-items: center;
    gap: 0.5em;
    width: 100%;
    padding: 1em;
    background: none;
    border: none;
    border-bottom: 1px solid currentcolor;
    color: var(--text-color);
    font: inherit;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
