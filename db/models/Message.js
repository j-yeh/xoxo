const { conn } = require('../conn');
const { Sequelize, DataTypes } = require('sequelize');

const Message = conn.define('message', {
  text: {
    type: DataTypes.TEXT,
  },
});

module.exports = Message;
