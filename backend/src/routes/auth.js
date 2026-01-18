const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { userId: user._id },
      'seu_secret_aqui',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, { httpOnly: true });
    res.json({ id: user._id, email: user.email, full_name: user.full_name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, full_name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'seu_secret_aqui', { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ id: user._id, email: user.email, full_name: user.full_name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Usuário atual
router.get('/me', async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, 'seu_secret_aqui');
    const user = await User.findById(decoded.userId);
    res.json({ id: user._id, email: user.email, full_name: user.full_name });
  } catch {
    res.status(401).json({ error: 'Não autenticado' });
  }
});

module.exports = router;