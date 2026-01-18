const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  user_email: String,
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);