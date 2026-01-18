import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RouteOrderCards() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>backend/src/routes/orderCards.js</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
{`const express = require('express');
const OrderCard = require('../models/OrderCard');
const router = express.Router();

// Listar
router.get('/', async (req, res) => {
  const orderCards = await OrderCard.find().sort({ createdAt: -1 }).limit(50);
  res.json(orderCards);
});

// Filtrar
router.post('/filter', async (req, res) => {
  const orderCards = await OrderCard.find(req.body);
  res.json(orderCards);
});

// Criar
router.post('/', async (req, res) => {
  const orderCard = new OrderCard(req.body);
  await orderCard.save();
  res.status(201).json(orderCard);
});

// Atualizar
router.patch('/:id', async (req, res) => {
  const orderCard = await OrderCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(orderCard);
});

// Deletar
router.delete('/:id', async (req, res) => {
  await OrderCard.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}