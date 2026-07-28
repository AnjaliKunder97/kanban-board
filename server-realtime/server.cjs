const { Server } = require('socket.io');

const PORT = process.env.PORT || 4000;

const io = new Server(PORT, {
  cors: { origin: '*' },
});

const boards = {};

io.on('connection', (socket) => {
  socket.on('join-board', (boardId) => {
    socket.join(boardId);
    if (boards[boardId]) {
      socket.emit('board-state', boards[boardId]);
    }
  });

  socket.on('board-update', ({ boardId, board }) => {
    boards[boardId] = board;
    socket.to(boardId).emit('board-state', board);
  });
});

console.log(`Realtime server running on port ${PORT}`);