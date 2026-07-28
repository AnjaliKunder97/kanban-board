const { Server } = require('socket.io');

const io = new Server(4000, {
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

console.log('Realtime server running on port 4000');