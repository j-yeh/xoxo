//associations
const Message = require('./Message');
const User = require('./User');

User.hasMany(Message);
Message.belongsTo(User);

module.exports = {
  Message,
  User,
};
