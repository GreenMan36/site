<script setup lang="ts">
const { data: vcpMembers } = await useAsyncData('vcp', () => queryCollection('vcp').order('order', 'ASC').all());
</script>

<template>
  <ContentContainer>
    <h1>Vertrouwenscontactpersonen</h1>
    <p class="vcp-blurb">
      Heb je vragen, problemen of wil je gewoon even praten? Neem dan contact op met een van onze
      vertrouwenscontactpersonen. Zij zijn er voor jou!
    </p>

    <ContentCard v-for="member in vcpMembers || []" :key="member._path" class="vcp-card">
      <template #image>
        <img class="member-photo hover-scale" :src="`/assets/vcpphotos/${member.photo}`" :alt="member.name" width="300" />
      </template>
      <div class="member-contact-info">
        <div class="member-name-status">
          <h3>{{ member.name }}</h3>
          <span class="member-status">{{ member.status }}</span>
        </div>
        <p>{{ member.phonenumber }}</p>
      </div>
      <div>
        <h4>Over mij</h4>
        <ContentRenderer :value="member" />
        <h4>Feitjes over mij</h4>
        <ul>
          <li v-for="(fact, idx) in member.funfacts" :key="idx">{{ fact }}</li>
        </ul>
      </div>
    </ContentCard>
  </ContentContainer>
</template>

<style scoped>
.vcp-blurb {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  text-align: center;
  hyphens: auto;
}

.vcp-card :deep(img) {
  width: 300px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  flex-shrink: 0;
}

.member-contact-info h3 {
  line-height: 1.4;
}

.member-contact-info h3::after {
  content: ' |';
}

.member-name-status {
  display: flex;
  gap: 0.5em;
  align-items: center;
}

.member-photo {
  flex-shrink: 0;
  border-radius: 10px;
  object-fit: cover;
  height: auto;
  aspect-ratio: 4/5;
}

@media (max-width: 1000px) {
  .member-name-status {
    flex-direction: column;
    gap: 0;
  }

  .member-contact-info h3::after {
    content: none;
  }
}
</style>
