<script setup lang="ts">
import { RouterLink } from 'vue-router';

// Mirrors the `links` collection schema in content.config.ts.
interface LinksItem {
  name: string;
  url: string;
  /** Emoji, Iconify name (`i-mdi:web`) or asset path (`/assets/icons/discord.ico`). */
  icon?: string;
}

const props = defineProps<{ link: LinksItem }>();

const linkIcon = computed(() => props.link.icon || '/icon.svg');
const isExternal = computed(() => !props.link.url.startsWith('/'));

const filetypes = ['png', 'svg', 'jpg', 'jpeg', 'svg', 'bmp', 'webp', 'gif', 'apng', 'avif', 'ico'];
const isImage = computed(() => filetypes.some((filetype) => linkIcon.value.endsWith('.' + filetype)));
const isIconName = computed(() => /^[a-z0-9-]+:[a-z0-9-]+$/i.test(linkIcon.value));
</script>

<template>
  <!-- .link-card is the container: the card responds to its own width, not the viewport -->
  <div class="link-card">
    <component
      :is="isExternal ? 'a' : RouterLink"
      v-bind="isExternal ? { href: link.url, target: '_blank', rel: 'noopener noreferrer' } : { to: link.url }"
      class="link"
    >
      <img v-if="isImage" :src="linkIcon" :alt="link.name" />
      <Icon v-else-if="isIconName" :name="linkIcon" class="icon" />
      <span v-else class="emoji">{{ linkIcon }}</span>
      <p>{{ link.name }}</p>
    </component>
  </div>
</template>

<style scoped>
.link-card {
  container-type: inline-size;
}

.link {
  font-family: var(--text-font);
  color: var(--text-color);
  text-decoration: none;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 1rem;

  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: rgba(var(--secondary-background-color-raw), 0.5);
  backdrop-filter: blur(8px) saturate(200%) brightness(96%);

  &:active,
  &:hover {
    background-color: rgba(var(--secondary-background-color-raw), 0.75);
  }

  & > :is(img, .emoji, .icon) {
    height: 64px;
    width: 64px;
    object-fit: contain;
    margin: auto 0;
  }

  & .emoji {
    font-family: var(--indicium-font);
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    font-size: 48px;
    overflow: hidden;
    line-height: 64px;
    user-select: none;
  }

  & p {
    margin: auto 0 auto 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }
}

/* Container query (top-level — nested @container is dropped in Vue dev): shrink
   the icon/padding when the CARD is narrow, not the viewport. */
@container (max-width: 562px) {
  .link {
    grid-template-columns: 48px 1fr;
    padding: 0.5rem 1rem;

    & > :is(img, .emoji, .icon) {
      height: 48px;
      width: 48px;
      font-size: 32px;
      line-height: 48px;
    }
  }
}
</style>
