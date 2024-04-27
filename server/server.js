// server.js
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Привет от сервера Darts!');
});

io.on('connection', socket => {
  console.log('Пользователь подключен:', socket.id);

  // Обработка получения сообщения от клиента
  socket.on('send_message', data => {
    console.log(`Сообщение от ${socket.id}: ${data.message}`);

    // Передача сообщения всем пользователям, кроме отправителя
    socket.broadcast.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
