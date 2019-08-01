const controller = require('../controllers/userController');
const { validateToken } = require('../helpers/utils');

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .get(validateToken, controller.getAllUsers);

  router.route('/login')
    .post(controller.login);
};
