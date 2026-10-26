<template>
  <v-form @submit.prevent="submit" class="d-flex ga-2 mt-3">
    <v-text-field 
      v-model="text"
      label="Add a card..."
      variant="outlined"
      density="compact"
      hide-details
    />
    <v-btn type="submit" color="primary" icon="mdi-plus" aria-label="Add card" />
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

</style>