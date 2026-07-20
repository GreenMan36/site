<template>
  <blockquote><ContentSlot :use="$slots.default" unwrap="p" /></blockquote>
</template>

<style scoped>
blockquote {
  margin: 0 0 1rem;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--indi-blue-1);
  background: var(--secondary-background-color);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}
</style>
