<template>
  <div class="content-card">
    <div class="content-card__image">
      <slot name="image" />
    </div>
    <div class="content-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  max-width: 1200px;
  margin: 4em auto;

  &:nth-child(odd) {
    .content-card__image {
      grid-column: 2;
    }
    .content-card__body {
      grid-column: 1;
      grid-row: 1;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;

    .content-card__image {
      grid-column: 1;
      margin: 0 auto;
      width: 95%;
    }
    .content-card__body {
      grid-column: 1;
      grid-row: auto;
      margin-top: 2em;
    }

    &:nth-child(odd) {
      .content-card__image {
        grid-column: 1;
      }
      .content-card__body {
        grid-column: 1;
        grid-row: auto;
      }
    }
  }
}

.content-card__image {
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(img) {
    border-radius: 10px;
    width: 80%;
  }
}

.content-card__body {
  background-color: var(--secondary-background-color);
  border-radius: 10px;
  padding: 1em 2em;

  :deep(h2),
  :deep(h3) {
    margin-top: 0;
  }
}
</style>
