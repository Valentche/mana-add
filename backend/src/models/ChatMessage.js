const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  invite_code: { type: String, required: true, unique: true },
  owner_email: { type: String, required: true },
  members: [{
    email: String,
    name: String,
    joined_at: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);