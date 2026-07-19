<!-- https://discord.gg/zYEEEpJhkr -->
<script setup lang="ts">
definePageMeta({ layout: 'minimal' });

onMounted(() => {
  const ref = new URLSearchParams(globalThis.location.search).get('ref');
  globalThis.location.href = 'https://discord.gg/zYEEEpJhkr' + (ref ? '?ref=' + ref : '');
});
</script>
