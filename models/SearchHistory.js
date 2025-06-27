const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  term: { type: String, required: true },
  results: { type: Object }, // aqui você pode guardar o resultado JSON das APIs
  searchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);