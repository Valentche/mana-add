import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModelChatMessage() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>backend/src/models/ChatMessage.js</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
{`const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true
  },
  order_id: String,
  sender_email: {
    type: String,
    required: true
  },
  sender_name: String,
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}