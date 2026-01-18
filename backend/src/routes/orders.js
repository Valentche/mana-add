import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RouteOrders() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>backend/src/routes/orders.js</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs">
{`const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Listar
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).limit(50);
  res.json(orders);
});

// Filtrar
router.post('/filter', async (req, res) => {
  const orders = await Order.find(req.body);
  res.json(orders);
});

// Criar
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// Atualizar
router.patch('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

// Deletar
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}