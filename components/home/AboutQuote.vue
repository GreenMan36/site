<template>
  <div class="text-container">
    <blockquote><ContentSlot :use="$slots.default" unwrap="p" /></blockquote>
  </div>
</template>

<style scoped>
.text-container {
  max-width: 860px;
  margin: 2.25rem auto 0;

  @media (max-width: 768px) {
    margin-top: 1.75rem;
  }
}

blockquote {
  margin: 0;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--indi-blue-1);
  background: var(--secondary-background-color);
  border-radius: 0 8px 8px 0;
  font-style: italic;
}
</style>
