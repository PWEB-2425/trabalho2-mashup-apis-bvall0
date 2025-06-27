const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/User');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Não autenticado');
}

router.get('/', isAuthenticated, async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).send('Termo de pesquisa em falta');

  try {
    req.user.searches.push({ query });
    await req.user.save();

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt`);
    const weather = await weatherRes.json();

    const wikiRes = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    const wikipedia = await wikiRes.json();

    const pixabayRes = await fetch(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=4`);
    const pixabayData = await pixabayRes.json();
    const images = pixabayData.hits.map(hit => hit.webformatURL);

    res.json({ weather, wikipedia, images });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro na pesquisa');
  }
});

router.get('/history', isAuthenticated, (req, res) => {
  res.json(req.user.searches);
});

module.exports = router;
