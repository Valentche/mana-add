import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModelOrderCard() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>backend/src/models/OrderCard.js</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
{`const mongoose = require('mongoose');

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

module.exports = mongoose.model('OrderCard', orderCardSchema);`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}