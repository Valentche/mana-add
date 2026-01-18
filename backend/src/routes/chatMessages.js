const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const router = express.Router();

// Listar (últimas 50)
router.get('/', async (req, res) => {
  try {
    const chatMessages = await ChatMessage.find().sort({ createdAt: -1 }).limit(50);
    res.json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar mensagens' });
  }
});

// Filtrar
router.post('/filter', async (req, res) => {
  try {
    const chatMessages = await ChatMessage.find(req.body);
    res.json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao filtrar mensagens' });
  }
});

// Criar
router.post('/', async (req, res) => {
  try {
    const chatMessage = new ChatMessage(req.body);
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar mensagem' });
  }
});

// Atualizar
router.patch('/:id', async (req, res) => {
  try {
    const chatMessage = await ChatMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(chatMessage);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar mensagem' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    await ChatMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar mensagem' });
  }
});

module.exports = router;