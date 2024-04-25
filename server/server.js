// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Привет от сервера Darts!');
});

io.on('connection', socket => {
  console.log('Пользователь подключен');

  socket.on('disconnect', () => {
    console.log('Пользователь отключен');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
