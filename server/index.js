const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Message } = require('../db');
const PORT = 3000 || process.env.PORT;
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');

// cors middleware
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
  },
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(
  '/bundle.js',
  express.static(path.join(__dirname, '../public/bundle.js'))
);

syncAndSeed();

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (error) {
    next(error);
  }
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.emit('online users', socket.id);
  socket.on('chat message', (data) => {
    console.log(data);
    socket.broadcast.emit('receive message', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/message', async (req, res, next) => {
  try {
    const response = await Message.findByPk(1);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
