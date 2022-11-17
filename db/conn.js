const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/xoxo',
  { logging: false }
);

module.exports = { conn };
