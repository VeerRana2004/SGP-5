const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');  // Import axios
const ACTIONS = require('./actions/Actions');

const app = express();
const server = http.createServer(app);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Enable CORS for your front-end
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow your React client
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

// Utility function to get all connected clients in a room
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
    socketId,
    username: userSocketMap[socketId],
  }));
}

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Handle user joining a room
  socket.on(ACTIONS.JOIN, async ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    
    // Example of using axios to fetch some data when a user joins a room
    try {
      const response = await axios.get('https://api.example.com/data'); // External API call
      console.log('Fetched data from external API:', response.data);
    } catch (error) {
      console.error('Error fetching data from external API:', error);
    }

    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // Handle code change and broadcast to other users in the room
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Synchronize code with a specific client
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // Handle disconnection and notify other clients
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
  });
});

// Fallback route to serve the React app for any undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Handle server errors (like if the port is already in use)
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try using a different port.`);
  } else {
    console.error('Server error:', err);
  }
});
