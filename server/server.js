const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server);
const PORT = 3000;
const connectedUsers = new Set();
const userNames = {}; // Используем объект для хранения имен пользователей по их сокет ID
let isGameStarted = false; // Флаг для отслеживания состояния игры

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
    console.log(`userNames = ${JSON.stringify(userNames)}`);
    socket.broadcast.emit('receive_name', name);
    io.emit('all_user_names', userNames);

    if (connectedUsers.size === 2 && !isGameStarted) {
      chooseStartingPlayer();
    }
  });

  socket.on('game_state', gameState => {
    console.log(
      `Сообщение от ${userNames[socket.id]} о статусе игры: ${JSON.stringify(
        gameState,
        null,
        2,
      )}`,
    );
    const users = Array.from(connectedUsers);
    console.log('to secondPlayer:', gameState.currentPlayer);
    const secondPlayerId = users.find(id => {
      return userNames[id] === gameState.currentPlayer;
    });

    const newGameState = {
      scorePlayer1: gameState.scorePlayer2,
      scorePlayer2: gameState.scorePlayer1,
      legsPlayer1: gameState.legsPlayer2,
      legsPlayer2: gameState.legsPlayer1,
      currentPlayer: gameState.currentPlayer,
    };
    console.log({gameState, newGameState});
    io.to(secondPlayerId).emit('game_state_to_second_player', newGameState);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключен:', socket.id);
    connectedUsers.delete(socket.id);
    delete userNames[socket.id];
    io.emit('usersCount', connectedUsers.size);
    io.emit('all_user_names', userNames);
    if (connectedUsers.size < 2) {
      isGameStarted = false; // Сброс флага, если игрок отключается
    }
  });

  const chooseStartingPlayer = () => {
    const users = Array.from(connectedUsers);
    const startingPlayerId = users[Math.floor(Math.random() * users.length)];
    io.to(startingPlayerId).emit(
      'starting_player',
      `${userNames[startingPlayerId]}`,
    );
    console.log(
      `Игрок, который начинает: ${userNames[startingPlayerId]} (${startingPlayerId})`,
    );
  };
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
