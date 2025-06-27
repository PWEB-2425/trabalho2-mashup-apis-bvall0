const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  query: String,
  date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  searches: [SearchSchema]
});

module.exports = mongoose.model('User', UserSchema);