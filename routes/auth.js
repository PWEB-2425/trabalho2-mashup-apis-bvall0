const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Campos em falta');

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).send('Utilizador já existe');

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    res.status(201).send('Registado com sucesso');
  } catch {
    res.status(500).send('Erro no servidor');
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send(info.message);
    req.logIn(user, err => {
      if (err) return next(err);
      res.send('Login efetuado');
    });
  })(req, res, next);
});



router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login.html');
  });
});

module.exports = router;
