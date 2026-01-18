const express = require('express');
const Group = require('../models/Group');
const router = express.Router();

// Listar
router.get('/', async (req, res) => {
  const groups = await Group.find().sort({ createdAt: -1 }).limit(50);
  res.json(groups);
});

// Filtrar
router.post('/filter', async (req, res) => {
  const groups = await Group.find(req.body);
  res.json(groups);
});

// Criar
router.post('/', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.status(201).json(group);
});

// Atualizar
router.patch('/:id', async (req, res) => {
  const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(group);
});

// Deletar
router.delete('/:id', async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;