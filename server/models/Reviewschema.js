const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyers', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: String,
}, { timestamps: true });

module.exports = mongoose.model('reviews', reviewSchema);