<template>
  <div class="home-page">
    <h1>Kanban Board</h1>
    <p>Create a new board, or join an existing one by its ID.</p>

    <button type="button" @click="createBoard">Create New Board</button>

    <form @submit.prevent="joinBoard" class="join-form">
      <input v-model="joinId" placeholder="Enter board ID to join" />
      <button type="submit">Join</button>
    </form>
  </div>
</template>

<script setup lang="ts">
// No explicit import needed for `useRouter` - it's a Nuxt/Vue Router
// auto-import, available globally in any .vue file or composable.
const router = useRouter();
const joinId = ref('');

function createBoard() {
  // crypto.randomUUID() generates a real random ID, browser-native,
  // no library needed - good enough for a demo project's "unique board
  // link" requirement.
  const newId = crypto.randomUUID().slice(0, 8);
  router.push(`/board/${newId}`);
}

function joinBoard() {
  if (joinId.value.trim()) {
    router.push(`/board/${joinId.value.trim()}`);
  }
}
</script>

<style scoped>
.home-page {
  max-width: 500px;
  margin: 4rem auto;
  text-align: center;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

button {
  padding: 0.7rem 1.4rem;
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin: 1rem 0;
}

.join-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.join-form input {
  flex: 1;
  padding: 0.6rem;
  border: 2px solid #dadce0;
  border-radius: 6px;
}
</style>