import { io } from 'socket.io-client';
import { useBoardStore } from '~/stores/board.store';

export function useRealtimeSync(boardId: string) {
  const boardStore = useBoardStore();
  const socket = io('https://kanban-realtime-server.onrender.com');

  socket.emit('join-board', boardId);

  socket.on('board-state', (board) => {
    boardStore.setBoard(board);
  });

  function broadcastUpdate() {
    if (boardStore.board) {
      socket.emit('board-update', { boardId, board: boardStore.board });
    }
  }

  return { broadcastUpdate };
}