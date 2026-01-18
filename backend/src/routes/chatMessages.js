import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RouteChatMessages() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>backend/src/routes/chatMessages.js</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
{`const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const router = express.Router();

// Listar
router.get('/', async (req, res) => {
  const chatMessages = await ChatMessage.find().sort({ createdAt: -1 }).limit(50);
  res.json(chatMessages);
});

// Filtrar
router.post('/filter', async (req, res) => {
  const chatMessages = await ChatMessage.find(req.body);
  res.json(chatMessages);
});

// Criar
router.post('/', async (req, res) => {
  const chatMessage = new ChatMessage(req.body);
  await chatMessage.save();
  res.status(201).json(chatMessage);
});

// Atualizar
router.patch('/:id', async (req, res) => {
  const chatMessage = await ChatMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(chatMessage);
});

// Deletar
router.delete('/:id', async (req, res) => {
  await ChatMessage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}