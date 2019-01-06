const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  genre: String,
});

module.exports = mongoose.model('categories', categorySchema);