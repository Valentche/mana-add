const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'ordered', 'arrived'],
    default: 'open'
  },
  deadline: Date,
  created_by: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);