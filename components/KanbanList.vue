<template>
  <div class="kanban-list">
    <h3>{{ list.title }}</h3>
    <draggable
      :list="list.cards"
      group="cards"
      item-key="id"
      class="card-drop-zone"
      @change="onDragChange"
    >
      <template #item="{ element }">
        <KanbanCard :card="element" @remove="removeCard(element.id)" />
      </template>
    </draggable>
    <AddCardForm @add="addCard" />
  </div>
</template>

<script setup lang="ts">
import { VueDraggableNext as draggable } from 'vue-draggable-next';
import type { KanbanList as KanbanListType } from '~/types/kanban';

const props = defineProps<{ list: KanbanListType }>();
const emit = defineEmits<{ changed: [] }>();

const boardStore = useBoardStore();

function addCard(text: string) {
  boardStore.addCard(props.list.id, text);
  emit('changed');
}

function removeCard(cardId: string) {
  boardStore.removeCard(props.list.id, cardId);
  emit('changed');
}

function onDragChange(event: any) {
  emit('changed');
}
</script>

<style scoped>
.kanban-list {
  background: #f1f3f4;
  border-radius: 8px;
  padding: 1rem;
  width: 260px;
  flex-shrink: 0;
}

h3 {
  margin: 0 0 1rem;
  font-size: 0.95rem;
}

.card-drop-zone {
  min-height: 40px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>