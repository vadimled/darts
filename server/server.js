// server.js
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Привет от сервера Darts!');
});

io.on('connection', socket => {
  console.log('Пользователь подключен');

  socket.on('message', msg => {
    console.log('Сообщение: ' + msg);
    io.emit('message', msg); // Отправка сообщения всем подключенным пользователям
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
