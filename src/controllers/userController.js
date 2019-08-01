const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 201;

      if (!err) {
        const newUser = new User(req.body);

        newUser.save((error, user) => {
          if (!error) {
            result.status = status;
            result.result = user;
          } else {
            status = 500;
            result.status = status;
            result.error = error;
          }
          res.status(status).send(result);
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        User.findOne({ email }, (err, user) => {
          if (!err && user) {
            bcrypt.compare(password, user.password).then((match) => {
              if (match) {
                const payload = { user: user.email };
                const options = {
                  expiresIn: '1d',
                  issuer: 'https://andela.com/',
                };
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);

                result.token = token;
                result.status = status;
                result.result = user;
              } else {
                status = 401;
                result.status = status;
                result.error = 'Authentication error';
              }
              res.status(status).send(result);
            }).catch((err) => {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            });
          } else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
          }
        });
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },

  getAllUsers: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        const payload = req.decoded;

        if (payload) {
          User.find({}, (err, users) => {
            if (!err) {
              result.status = status;
              result.error = err;
              result.result = users;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication failed';
          res.status(status).send(result);
        }
      } else {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    });
  },
};
