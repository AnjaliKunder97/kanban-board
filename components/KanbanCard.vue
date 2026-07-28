<template>
  <div
    class="kanban-card"
    draggable="true"
    @dragstart="onDragStart"
  >
    <p>{{ card.text }}</p>
    <button type="button" class="remove-btn" @click="$emit('remove')" aria-label="Remove card">
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '~/types/kanban';

const props = defineProps<{ card: Card; listId: string }>();
defineEmits<{ remove: [] }>();

function onDragStart(event: DragEvent) {
  // Stash which card and which list it came from, so the drop target
  // can read this back out - dataTransfer is the standard native way
  // to pass data between drag source and drop target.
  event.dataTransfer?.setData(
    'application/json',
    JSON.stringify({ cardId: props.card.id, fromListId: props.listId }),
  );
}
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

.kanban-card:active {
  cursor: grabbing;
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