const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Conectar MongoDB
mongoose.connect('mongodb://localhost:27017/mtg-cards')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rotas (vamos criar depois)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/order-cards', require('./routes/orderCards'));
app.use('/api/chat', require('./routes/chatMessages'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
});