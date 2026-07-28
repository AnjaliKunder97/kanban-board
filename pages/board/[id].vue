<template>
  <div class="board-page">
    <div class="board-header">
      <h1>{{ boardStore.board?.name ?? 'Loading board...' }}</h1>
      <p class="board-id">Board ID: <code>{{ boardId }}</code> (share this to collaborate)</p>
    </div>

    <div v-if="boardStore.board" class="board-lists">
      <KanbanList
        v-for="list in boardStore.board.lists"
        :key="list.id"
        :list="list"
        @changed="broadcastUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// `useRoute`, `useBoardStore` (from stores/board.store.ts), and
// `useRealtimeSync` (from composables/useRealtimeSync.ts) are all
// auto-imported by Nuxt - no import statements needed for any of them.
const route = useRoute();
const boardId = route.params.id as string;

const boardStore = useBoardStore();
const { broadcastUpdate } = useRealtimeSync(boardId);

// If this is a brand new board ID nobody has joined yet, seed it with
// an empty starter board (three empty lists) rather than showing
// nothing. If someone else already created this board, the realtime
// sync will overwrite this with the real state once it connects.
if (!boardStore.board) {
  boardStore.setBoard({
    id: boardId,
    name: `Board ${boardId}`,
    lists: [
      { id: 'todo', title: 'To Do', cards: [] },
      { id: 'in-progress', title: 'In Progress', cards: [] },
      { id: 'done', title: 'Done', cards: [] },
    ],
  });
}
</script>

<style scoped>
.board-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
}

.board-header {
  margin-bottom: 2rem;
}

.board-id {
  color: #5f6368;
  font-size: 0.9rem;
}

.board-lists {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}
</style>