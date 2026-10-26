<template>
  <v-card class="kanban-list pa-4 border" flat>
    <h3 class="text-subtitle-1 font-weight-bold mb-4">{{ list.title }}</h3>

    <div
      class="card-drop-zone d-flex flex-column ga-2"
      :class="{ 'drag-over': isDraggedOver }"
      @dragover.prevent="isDraggedOver = true"
      @dragleave="isDraggedOver = false"
      @drop="onDrop"
    >
      <KanbanCard
        v-for="card in list.cards"
        :key="card.id"
        :card="card"
        :list-id="list.id"
        @remove="removeCard(card.id)"
      />
    </div>

    <AddCardForm @add="addCard" />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { KanbanList as KanbanListType } from '../types/kanban';
import { useBoardStore } from '../stores/board.store';

const props = defineProps<{ list: KanbanListType }>();
const emit = defineEmits<{ changed: [] }>();

const boardStore = useBoardStore();
const isDraggedOver = ref(false);

function addCard(text: string) {
  boardStore.addCard(props.list.id, text);
  emit('changed');
}

function removeCard(cardId: string) {
  boardStore.removeCard(props.list.id, cardId);
  emit('changed');
}

function onDrop(event: DragEvent) {
  isDraggedOver.value = false;
  const data = event.dataTransfer?.getData('application/json');
  if (!data) return;

  const { cardId, fromListId } = JSON.parse(data);
  if (fromListId === props.list.id) return;

  // Dropped cards are appended to the end of the target list.
  const targetList = boardStore.board?.lists.find(l => l.id === props.list.id);
  boardStore.moveCard(cardId, fromListId, props.list.id, targetList?.cards.length ?? 0);
  emit('changed');
}
</script>

<style scoped>
.kanban-list {
  width: 260px;
  flex-shrink: 0;
  background-color: rgba(var(--v-theme-on-surface), 0.08);
}

.card-drop-zone {
  min-height: 60px;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

.card-drop-zone.drag-over {
  background-color: rgba(var(--v-theme-primary), 0.1);
  outline: 2px dashed rgb(var(--v-theme-primary));
}
</style>