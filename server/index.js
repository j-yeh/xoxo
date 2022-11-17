const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Message } = require('../db');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3000 || process.env.PORT;
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
  console.log('a user connected');
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
