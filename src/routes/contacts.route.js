const controller = require('../controllers/contactController');
const { validateToken } = require('../helpers/utils');

module.exports = (router) => {
  router.route('/contacts')
    .post(validateToken, controller.add)
    .get(validateToken, controller.getAll);
};
