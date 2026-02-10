<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import DataNotFound from '@/assets/icons/data-not-found.svg?component';

// Query all boards from collection sorted by year descending
const { data: allBoards } = await useAsyncData('allBoards', () =>
  queryCollection('boards').order('year', 'DESC').all(),
);

// Separate current and previous boards
const currentBoard = computed(() => allBoards.value?.find((b) => b.isCurrent));
const previousBoards = computed(() => allBoards.value?.filter((b) => !b.isCurrent) || []);
</script>

<template>
  <ContentContainer>
    <h1>Indicium Besturen</h1>

    <!-- Current board section -->
    <div v-if="currentBoard" class="board current-board">
      <img
        v-if="currentBoard.groupPhoto"
        :src="'/assets/boards/' + currentBoard.groupPhoto"
        alt="Huidig Bestuur"
        class="img"
      />
      <DataNotFound v-else class="img" />
      <div class="board-info">
        <h2 class="board-year">{{ currentBoard.year }} (Huidig Bestuur)</h2>
        <ContentRenderer v-if="currentBoard.body" :value="currentBoard" />
        <p v-for="member in currentBoard.members" :key="member.name">
          <b>{{ member.name }}</b> - <span class="function">{{ member.function }}</span>
        </p>
      </div>
    </div>

    <!-- Previous boards -->
    <div v-for="board in previousBoards" :key="board.year" class="board">
      <img v-if="board.groupPhoto" :src="'/assets/boards/' + board.groupPhoto" alt="Groepsfoto" class="img" />
      <DataNotFound v-else class="img" />
      <div class="board-info">
        <h2 class="board-year">{{ board.year }}</h2>
        <ContentRenderer v-if="board.body" :value="board" />
        <p v-for="member in board.members" :key="member.name">
          <b>{{ member.name }}</b> - <span class="function">{{ member.function }}</span>
        </p>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.board {
  border-bottom: 3px solid var(--indi-blue-1);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5em 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 5%;

  &.current-board {
    background-color: var(--secondary-background-color);
    padding: 2.5em 2em;
    border-radius: 10px;
    margin-bottom: 3em;
  }

  .img {
    display: block;
    height: 100%;
    max-height: 512px;
    aspect-ratio: 885/512;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.2s;
    background-color: var(--secondary-background-color);
  }

  .img:hover {
    transform: scale(1.05);
    transition: transform 0.5s;
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    grid-auto-flow: row;
    .img {
      margin: 0 auto;
      max-height: 320px;
      width: 95%;
    }

    .board-info {
      margin-top: 2em;
    }
  }

  &:nth-child(odd) .board-info {
    grid-column: 1;
  }

  &:last-child {
    border: none;
  }

  .board-year {
    margin: 0;
  }

  .function {
    color: #b3b3b3;
  }

  .board-info {
    max-width: 600px;
  }
}
</style>
