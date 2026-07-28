<template>
  <div class="kanban-card">
    <p>{{ card.text }}</p>
    <button type="button" class="remove-btn" @click="$emit('remove')" aria-label="Remove card">
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '~/types/kanban';

defineProps<{ card: Card }>();
defineEmits<{ remove: [] }>();
</script>

<style scoped>
.kanban-card {
  background: #fff;
  border-radius: 6px;
  padding: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: grab;
}

.kanban-card p {
  margin: 0;
  font-size: 0.9rem;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #5f6368;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}
</style>