// controllers/favoriteController.js
const Favorite = require("../favorite/favoriteschema");
const Artwork = require("../Artists/ArtWorks/artworkSchema"); // for populate
const User = require("../Users/userSchema");

exports.addToFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Prevent duplicates by checking first
    const existing = await Favorite.findOne({ userId, productId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Already in favorites" });
    }

    const favorite = new Favorite({ userId, productId });
    await favorite.save();

    res.status(200).json({ success: true, message: "Added to favorites", data: favorite });
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
// console.log(userId,"userId");

    const favorites = await Favorite.find({ userId })
      .populate("productId") // populates product/artwork info
      .sort({ addedAt: -1 });
// console.log(favorites,"favorites");

    res.status(200).json({ success: true, data: favorites });
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const result = await Favorite.findOneAndDelete({ userId, productId });

    if (!result) {
      return res.status(404).json({ success: false, message: "Favorite not found" });
    }

    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
