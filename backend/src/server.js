const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// AQUI ESTAVA O ERRO:
// Antes estava 'mongodb://localhost:27017...'
// Agora usamos a variável de ambiente process.env.MONGODB_URI
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mtg-cards';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB conectado em:', mongoUri))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/order-cards', require('./routes/orderCards'));
app.use('/api/chat', require('./routes/chatMessages'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});