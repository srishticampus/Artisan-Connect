const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'artisans', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
    images: Object,
    ratings: {
      averageRating: Number,
      reviewsCount: Number,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('products', productSchema);
  