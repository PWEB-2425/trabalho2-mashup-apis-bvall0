require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
require('./config/passportConfig');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'segredoqualquer',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Erro ao fazer logout');
      }
      res.redirect('/login.html');
    });
  } else {
    res.redirect('/login.html');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/search', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
