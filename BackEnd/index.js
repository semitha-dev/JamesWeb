const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Use the app in the server

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
  console.log('A user has connected');

  socket.on('message', (data) => {
    const { name, message } = data;
    io.emit('broadcast', `${name}: ${message}`); // Emit message back to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

// Make sure you are using `server.listen()` instead of `app.listen()`
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
