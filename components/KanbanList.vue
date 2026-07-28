<template>
  <div class="kanban-list">
    <h3>{{ list.title }}</h3>

    <div
      class="card-drop-zone"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { KanbanList as KanbanListType } from '~/types/kanban';

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

  // Don't do anything if a card is dropped back into its own list -
  // no actual move needed.
  if (fromListId === props.list.id) return;

  // Simplified: dropped cards go to the end of the target list, rather
  // than trying to calculate a precise drop-position index. Precise
  // reordering within a list is a reasonable future enhancement, not
  // required to demonstrate working drag-and-drop between lists.
  boardStore.moveCard(cardId, fromListId, props.list.id, boardStore.board?.lists.find(l => l.id === props.list.id)?.cards.length ?? 0);
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
  min-height: 60px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

.card-drop-zone.drag-over {
  background-color: rgba(26, 115, 232, 0.1);
  outline: 2px dashed #1a73e8;
}
</style>