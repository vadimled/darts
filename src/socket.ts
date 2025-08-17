// src/socket.ts
import io from 'socket.io-client';

// Replace 'http://localhost:3000' with the URL of your actual server
const SOCKET_URL = 'http://localhost:3000';

const socket = io(SOCKET_URL, {
  transports: ['websocket'] // use WebSocket for connectivity
});

export default socket;
