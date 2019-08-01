const mongoose = require('mongoose');

const
  { Schema } = mongoose;

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
    trim: true,
    maxlength: 10,
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
    trim: true,
    maxlength: 10,
  },
  message: {
    type: String,
    required: true,
    maxlength: 266,
  },
});

module.exports = mongoose.model('Message', messageSchema);
