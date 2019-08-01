const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    const authHeaders = req.headers.authorization;
    let result;

    if (authHeaders) {
      const token = req.headers.authorization.split(' ')[1];
      const options = {
        expiresIn: '1d',
        issuer: 'https://andela.com/',
      };

      try {
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = {
        error: 'Authentication failed. Token is required',
        status: 401,
      };
      res.status(401).send(result);
    }
  },
};
