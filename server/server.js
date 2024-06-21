// server.js
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
  console.log(socket.connected);
  next();
});

io.on('connection', socket => {
  connectedUsers.add(socket.id); // Добавляем пользователя при подключении
  console.log('Пользователь подключен:', socket.id);
  console.log('Пользователи:', connectedUsers);

  // Сообщаем всем клиентам о изменении числа подключенных пользователей
  socket.broadcast.emit('usersCount', {
    count: connectedUsers.size,
  });

  // Обработка получения сообщения от клиента
  socket.on('send_name', secondPlayerName => {
    console.log(`Сообщение от ${socket.id}: ${secondPlayerName.name}`);

    // Передача сообщения всем пользователям, кроме отправителя
    socket.broadcast.emit('receive_name', secondPlayerName.name);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен:', socket.id);
    connectedUsers.delete(socket.id);
    socket.broadcast.emit('usersCount', connectedUsers.size);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
