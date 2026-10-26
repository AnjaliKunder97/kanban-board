<template>
  <v-container max-width="1100" class="py-8">
    <header class="mb-8">
      <h1 class="text-h4 mb-1">{{ boardStore.board?.name ?? 'Loading board...' }}</h1>
      <p class="text-body-2 text-medium-emphasis">
        Board ID: <code>{{ boardId }}</code> (share this to collaborate)
      </p>
    </header>

    <div v-if="boardStore.board" class="d-flex ga-6 align-start overflow-x-auto pb-2">
      <KanbanList
        v-for="list in boardStore.board.lists"
        :key="list.id"
        :list="list"
        @changed="broadcastUpdate"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { useBoardStore } from '../../stores/board.store';
import { useRealtimeSync } from '../../composables/useRealtimeSync'
const route = useRoute();
const boardId = route.params.id as string;

const boardStore = useBoardStore();
const { broadcastUpdate } = useRealtimeSync(boardId);

// Seed a new board with three empty lists; realtime sync overwrites
// this with the real state if the board already exists.
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

</style>