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
// Mobile accordion only; desktop opens via :hover/:focus-within in CSS.
const open = ref(false);

function getLinkClass(url: string) {
  return {
    'button secondary rounded': url === '/links',
    'button primary rounded': url === '/lid-worden',
    'button rounded': url.startsWith('http'),
  };
}
</script>

<template>
  <li class="menu-item" :data-depth="depth % 3" :class="{ open }">
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
      :aria-expanded="open"
      :aria-label="`Submenu ${open ? 'sluiten' : 'openen'}: ${item.title}`"
      @click="open = !open"
    >
      <span aria-hidden="true" />
    </button>
    <ul v-if="item.children" class="dropdown">
      <MenuItem v-for="(child, index) in item.children" :key="`${index}-${child.title}-${child.url}`" :item="child" :depth="depth + 1" />
    </ul>
  </li>
</template>

<style scoped>
/* One recursive tree, two presentations. Desktop (>768px): anchored dropdowns
   opened by :hover/:focus-within. Mobile: static accordion opened by toggle. */

.menu-item {
  /* Same name on every item is fine: absolutely-positioned descendants anchor
     to the NEAREST ancestor with a matching name (implicit anchoring). */
  anchor-name: --submenu-anchor;
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

.submenu-toggle {
  display: none;
}

/* ---------- Desktop dropdowns ---------- */
@media screen and (min-width: 769px) {
  .dropdown {
    display: none;
    position: absolute;
    /* Below top-level items, beside nested ones; flips when room runs out
       (replaces the old getBoundingClientRect measuring). */
    position-area: block-end;
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
    position-area: inline-end;
    position-try-fallbacks: flip-inline, flip-block;
  }
  /* No anchor positioning (older browsers): today's static placement. */
  @supports not (position-area: block-end) {
    .dropdown {
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
[data-depth='0'].open {
  box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);
}

[data-depth='0'] .menu-item a:hover,
[data-depth='0'] .menu-item a:focus-visible {
  background-color: var(--indi-blue-green-1);
}

[data-depth='1'] > .dropdown,
[data-depth='1'].open {
  box-shadow: inset 0 0 0 2px var(--indi-green-1);
}

[data-depth='1'] .menu-item a:hover,
[data-depth='1'] .menu-item a:focus-visible {
  background-color: var(--indi-green-1);
}

[data-depth='2'] > .dropdown,
[data-depth='2'].open {
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

/* ---------- Mobile accordion ---------- */
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

  /* CTA pills become plain rows in the accordion. */
  .menu-item .navlink.button {
    width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: inherit;
    margin: 0;
    text-align: left;
    background: transparent;
    color: var(--text-color);
  }

  .menu-item:has(> .dropdown) > .navlink::after {
    content: none;
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

  .menu-item.open > .submenu-toggle > span::before {
    content: '▾';
  }

  .dropdown {
    display: none;
    position: static;
    flex-basis: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Level color language on mobile rows (mirrors the depth borders). */
  .menu-root > .menu-item {
    border-bottom: 1px solid var(--indi-blue-1);
  }

  .menu-root > .menu-item > .dropdown .menu-item {
    border-bottom-color: var(--indi-blue-green-1);
  }

  .menu-root > .menu-item > .dropdown .dropdown .menu-item {
    border-bottom-color: var(--indi-green-1);
  }

  .menu-item.open > .dropdown {
    display: block;
  }

}
</style>
