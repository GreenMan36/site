<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';

// Query only the current board from collection
const { data: currentBoard } = await useAsyncData('currentBoard', () =>
  queryCollection('boards').where('isCurrent', '=', true).first(),
);
</script>

<template>
  <ContentContainer>
    <h1>Bestuur {{ currentBoard?.boardNumber }}</h1>
    <img
      v-if="currentBoard?.groupPhoto"
      id="group-photo"
      :src="`/assets/boards/${currentBoard.groupPhoto}`"
      :alt="`Groepsfoto ${currentBoard.boardNumber}e bestuur`"
    />
    <div v-for="(member, index) in currentBoard?.members || []" :key="index" class="member">
      <img
        class="member-photo"
        :src="member.photo ? `/assets/boards/${member.photo}` : `https://cataas.com/cat/says/${member.name}`"
        :alt="member.name"
        :title="member.figcaption ? member.figcaption : undefined"
      />
      <h3>{{ member.name }}</h3>
      <h4>{{ member.function }}</h4>
      <address>
        <a href="mailto:{{ member.email }}">{{ member.email }}</a>
      </address>
      <br />
      <h5 v-if="member.responsibilities">Verantwoordelijkheden:</h5>
      <p v-if="member.responsibilities">{{ member.responsibilities.join(', ') }}</p>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.content-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: fit-content;
}

h1 {
  text-align: center;
}

.member {
  max-width: 1170px;
  margin: 2em 3em;

  h5 {
    font-size: 1.1em;
  }

  p {
    margin-top: 0em;
    font-size: 1em;
  }

  .member-photo {
    float: left;
    margin: 0 3em 0 0;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
      transition: transform 0.2s;
    }
  }

  &:nth-child(even) {
    .member-photo {
      float: right;
      margin: 0 0 0 3em;
    }

    h3,
    h4,
    h5,
    p,
    address {
      text-align: right;
    }
  }
}

@media screen and (max-width: #{$bp-tablet-md}) {
  .member {
    margin: 2em auto;

    &:nth-child(even) {
      .member-photo {
        margin: 0 auto 1em;
      }

      h3,
      h4 {
        text-align: center;
      }
    }
  }

  .member-photo {
    margin: 0 auto 1em;
    display: block;
  }

  h3,
  h4 {
    text-align: center;
  }
}

@media screen and (max-width: #{$bp-tablet-sm}) {
  .member-photo {
    margin: 0 auto;
  }
}

#group-photo {
  display: block;
  margin: 2em auto;
  max-height: 512px;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
  }
}
</style>
