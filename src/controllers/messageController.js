const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Message = require('../models/Message');
const Contact = require('../models/Contact');

const connUri = process.env.MONGO_LOCAL_CONN_URL;

module.exports = {
  add: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 201;

      if (!err) {
        const { sender, recipient, message } = req.body;

        if (req.body) {
          // FInd Sender ID
          Contact.findOne({ phoneNumber: sender }, (err, sentFrom) => {
            if (!err) {
              if (sentFrom) {
                const { _id } = sentFrom;
                const senderId = _id;

                // Find recipient ID
                Contact.findOne({ phoneNumber: recipient }, (err, sentTo) => {
                  if (!err) {
                    if (sentTo) {
                      const { _id } = sentTo;
                      const recipientId = _id;

                      // Recipient and the sender should not be the same
                      if (recipient !== sender) {
                        const sms = new Message({ message, sender: senderId, recipient: recipientId });

                        sms.save((error, message) => {
                          if (!error) {
                            result.status = status;
                            result.data = message;
                          } else {
                            status = 500;
                            result.status = status;
                            result.error = error;
                          }
                          res.status(status).send(result);
                        });
                      } else {
                        status = 400;
                        result.status = status;
                        result.error = 'Recipient and sender cannot be the same';
                        res.status(status).send(result);
                      }
                    } else {
                      status = 404;
                      result.status = status;
                      result.error = 'Recipient Not found';
                      res.status(status).send(result);
                    }
                  } else {
                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                  }
                });
              } else {
                status = 404;
                result.status = status;
                result.error = 'Sender Not found';
                res.status(status).send(result);
              }
            } else {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);
            }
          });
        }
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
          Message
            .find({})
            .populate(['sender', 'recipient'])
            .exec((error, messages) => {
              if (!error) {
                result.status = status;
                result.data = messages;
              } else {
                status = 500;
                result.status = status;
                result.error = error;
              }
              res.status(status).send(result);
            });
        }
      }
    });
  },

  delete: (req, res) => {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
      const result = {};
      let status = 200;

      if (!err) {
        const payload = req.decoded;
        const messageId = mongodb.ObjectID(req.params.id);

        if (payload) {
          Message.deleteOne({ _id: messageId }, (error, message) => {
            if (!error) {
              result.status = status;
              result.data = message;
            } else {
              status = 500;
              result.status = status;
              result.error = error;
            }
            res.status(status).send(result);
          });
        } else {
          result.status = 401;
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
