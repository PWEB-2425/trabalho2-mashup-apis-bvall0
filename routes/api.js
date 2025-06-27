const express = require('express');
const axios = require('axios');
const ensureAuthenticated = require('../middleware/auth');
const SearchHistory = require('../models/SearchHistory');

const router = express.Router();

router.get('/search', ensureAuthenticated, async (req, res) => {
  const term = req.query.q;
  if (!term) return res.status(400).json({ msg: 'Termo de pesquisa obrigatório' });

  try {
    const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: term,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'pt'
      }
    });

    const wikiRes = await axios.get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);

    const data = {
      weather: weatherRes.data,
      wiki: wikiRes.data
    };

    // Guardar no histórico
    await SearchHistory.create({
      user: req.user._id,
      term,
      result: data
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados externos', details: err.message });
  }
});

module.exports = router;