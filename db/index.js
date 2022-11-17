const { syncAndSeed } = require('./seed');
const { Message, User } = require('./models');

module.exports = { syncAndSeed, Message, User };
