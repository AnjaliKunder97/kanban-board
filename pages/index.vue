<template>
  <v-container class="text-center mt-12" max-width="500">
    <h1 class="text-h3 mb-2">Kanban Board</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">Create a new board, or join an existing one by its ID.</p>

    <v-btn  color="primary" size="large" @click="createBoard">
      Create New Board
    </v-btn>

    <v-form class="d-flex ga-2 mt-8" @submit.prevent="joinBoard">
      <v-text-field
        v-model="joinId"
        label="Enter board ID to join"
        variant="outlined"
        density="comfortable"
        hide-details
      />
      <v-btn type="submit" color="primary" variant="tonal" height="48">
        Join
      </v-btn>
    </v-form>
  </v-container> 
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app';
import { ref } from 'vue';

const router = useRouter();
const joinId = ref('');

function createBoard() {
  const newId = crypto.randomUUID().slice(0, 8);
  router.push(`/board/${newId}`);
}

function joinBoard() {
  if (joinId.value.trim()) {
    router.push(`/board/${joinId.value.trim()}`);
  }
}
</script>