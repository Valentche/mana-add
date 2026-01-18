const express = require('express');
const OrderCard = require('../models/OrderCard');
const router = express.Router();

// Listar
router.get('/', async (req, res) => {
  try {
    const orderCards = await OrderCard.find().sort({ createdAt: -1 }).limit(50);
    res.json(orderCards);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar cartas' });
  }
});

// Filtrar
router.post('/filter', async (req, res) => {
  try {
    const orderCards = await OrderCard.find(req.body);
    res.json(orderCards);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao filtrar cartas' });
  }
});

// Criar
router.post('/', async (req, res) => {
  try {
    const orderCard = new OrderCard(req.body);
    await orderCard.save();
    res.status(201).json(orderCard);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar carta' });
  }
});

// Atualizar
router.patch('/:id', async (req, res) => {
  try {
    const orderCard = await OrderCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(orderCard);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar carta' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    await OrderCard.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover carta' });
  }
});

module.exports = router;