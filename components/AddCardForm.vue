<template>
  <form @submit.prevent="submit" class="add-card-form">
    <input v-model="text" placeholder="Add a card..." />
    <button type="submit">+</button>
  </form>
</template>

<script setup lang="ts">
const text = ref('');
const emit = defineEmits<{ add: [text: string] }>();

function submit() {
  if (text.value.trim()) {
    emit('add', text.value.trim());
    text.value = '';
  }
}
</script>

<style scoped>
.add-card-form {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.add-card-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #dadce0;
  border-radius: 6px;
  font-size: 0.85rem;
}

.add-card-form button {
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 6px;
  background: #1a73e8;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
}
</style>