<!-- https://discord.gg/zYEEEpJhkr -->
<script setup lang="ts">
definePageMeta({ layout: 'minimal' });
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; height: 100vh; height: 100dvh">
    <p>Redirecting to <a href="https://discord.gg/zYEEEpJhkr">HBO-ICT Discord</a>...</p>
    <!-- The iframe will likely not be visible, it's there just in case. Most useful if we ever use SSR -->
    <iframe
      title="HBO-ICT Discord"
      src="https://discord.com/widget?id=748875787180179457&theme=dark"
      width="100%"
      height="100%"
      style="max-width: 600px; max-height: 800px"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    // getting the ref might not be needed but at least we know 100% that Discord gets the info
    const ref = new URLSearchParams(globalThis.location.search).get('ref');
    globalThis.location.href = 'https://discord.gg/zYEEEpJhkr' + (ref ? '?ref=' + ref : '');
  },
};
</script>
