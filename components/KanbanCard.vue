<template>
  <v-card
    class="kanban-card"
    draggable="true"
    elevation="1"
    @dragstart="onDragStart"
  >
    <div class="d-flex justify-space-between align-start pa-3 ga-2">
      <p class="text-body-2">{{ card.text }}</p>
      <v-btn
        icon="mdi-close"
        size="x-small"
        variant="text"
        aria-label="Remove card"
        @click="$emit('remove')"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Card } from '../types/kanban';

const props = defineProps<{ card: Card; listId: string }>();
defineEmits<{ remove: [] }>();

function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData(
    'application/json',
    JSON.stringify({ cardId: props.card.id, fromListId: props.listId }),
  );
}
</script>

<style scoped>
.kanban-card {
  cursor: grab;
}

.kanban-card:active {
  cursor: grabbing;
}
</style>