const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.pre('save', (next) => {
  const user = this;

  if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, (err, hash) => {
      if (err) {
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
