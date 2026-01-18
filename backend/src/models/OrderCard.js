const mongoose = require('mongoose');

const orderCardSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  group_id: {
    type: String,
    required: true
  },
  scryfall_id: String,
  card_name: {
    type: String,
    required: true
  },
  card_image: String,
  set_name: String,
  quantity: {
    type: Number,
    default: 1
  },
  price: Number,
  added_by_email: {
    type: String,
    required: true
  },
  added_by_name: String
}, { timestamps: true });

module.exports = mongoose.model('OrderCard', orderCardSchema);