const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyers', required: true },
    artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'artisans' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
  }, { timestamps: true });
  
  module.exports = mongoose.model('favorites', favoriteSchema);