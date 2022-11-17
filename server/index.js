const express = require('express');
const app = express();
const path = require('path');
const { syncAndSeed, Message } = require('../db');

app.listen(3000, () => {
  console.log('listening on port 3000');
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

app.get('/message', async (req, res, next) => {
  try {
    const response = await Message.findByPk(1);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
