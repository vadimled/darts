const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;
const connectedUsers = new Set();
const userNames = {}; // Используем объект для хранения имен пользователей по их сокет ID

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
  connectedUsers.add(socket.id);
  console.log('Пользователь подключен:', socket.id);
  console.log('Пользователи:', connectedUsers);

  io.emit('usersCount', connectedUsers.size);

  socket.on('send_name', ({name}) => {
    console.log(`Сообщение от ${socket.id}: ${name}`);
    userNames[socket.id] = name;
    socket.broadcast.emit('receive_name', name);
    io.emit('all_user_names', userNames);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен:', socket.id);
    connectedUsers.delete(socket.id);
    delete userNames[socket.id];
    io.emit('usersCount', connectedUsers.size);
    io.emit('all_user_names', userNames);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
