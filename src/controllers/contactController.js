const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 201;

      if (!err) {
        const newContact = new Contact(req.body);

        newContact.save((error, contact) => {
          if (!error) {
            result.status = status;
            result.result = contact;
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

  getAll: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        const payload = req.decoded;

        if (payload) {
          Contact.find({}, (error, contacts) => {
            if (!error) {
              result.status = status;
              result.data = contacts;
            } else {
              status = 500;
              result.status = status;
              result.error = error;
            }
            res.status(status).send(result);
          });
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication failed.';
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
