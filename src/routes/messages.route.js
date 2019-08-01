const controller = require('../controllers/messageController');
const { validateToken } = require('../helpers/utils');

module.exports = (router) => {
  router.route('/messages')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll);

  router.route('/messages/:id')
    .delete(validateToken, controller.delete);
};
