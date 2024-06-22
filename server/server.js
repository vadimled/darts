const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const connectedUsers = new Set(); // Используем Set для хранения уникальных ID подключенных пользователей

app.get('/', (req, res) => {
  res.send('Привет от сервера Darts!');
});

io.use((socket, next) => {
  if (connectedUsers.size >= 2) {
    console.log('Maximum number of users connected');
    socket.emit('max_users', 'Maximum number of users connected');
    return socket.disconnect();
  }
  next();
});

io.on('connection', socket => {
  connectedUsers.add(socket.id); // Добавляем пользователя при подключении
  console.log('Пользователь подключен:', socket.id);
  console.log('Пользователи:', connectedUsers);

  io.emit('usersCount', connectedUsers.size);

  socket.on('send_name', secondPlayerName => {
    console.log(`Сообщение от ${socket.id}: ${secondPlayerName.name}`);
    socket.broadcast.emit('receive_name', secondPlayerName.name);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен:', socket.id);
    connectedUsers.delete(socket.id);
    io.emit('usersCount', connectedUsers.size);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
