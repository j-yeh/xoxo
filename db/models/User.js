const { conn } = require('../conn');
const { Sequelize, DataTypes } = require('sequelize');

const User = conn.define('user', {
  username: {
    type: DataTypes.TEXT,
  },
  first_name: {
    type: DataTypes.TEXT,
  },
  last_name: {
    type: DataTypes.TEXT,
  },
});

module.exports = User;
