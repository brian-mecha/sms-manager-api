const users = require('./users.route');
const contacts = require('./contacts.route');
const messages = require('./messages.route');

module.exports = (router) => {
  users(router);
  contacts(router);
  messages(router);
  return router;
};
