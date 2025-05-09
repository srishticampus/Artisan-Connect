const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // assuming your user model is named "User"
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artworks", // assuming your product/artwork model is "Artwork"
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true }); // prevent duplicates

module.exports = mongoose.model("favorites", favoriteSchema);
