const Artwork = require('./artworkSchema'); // adjust the path to your model

// Add or update a rating
exports.rateArtwork = async (req, res) => {
  const { artworkId } = req.params;
  const { userId, rating } = req.body;

  if (!userId || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid userId or rating" });
  }

  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) return res.status(404).json({ message: "Artwork not found" });

    // Check if user has already rated
    const existingRating = artwork.ratings.find(r => r.userId.toString() === userId);

    if (existingRating) {
      existingRating.rating = rating; // Update existing rating
    } else {
      artwork.ratings.push({ userId, rating }); // Add new rating
    }

    await artwork.save();
    return res.status(200).json({ message: "Rating saved successfully", artwork });
  } catch (error) {
    return res.status(500).json({ message: "Error rating artwork", error });
  }
};

// Get average rating for an artwork
exports.getAverageRating = async (req, res) => {
    const { artworkId } = req.params;
  
    try {
      const artwork = await Artwork.findById(artworkId);
      if (!artwork) {
        return res.status(404).json({ message: "Artwork not found" });
      }
  
      const ratings = artwork.ratings || [];
      if (ratings.length === 0) {
        return res.status(200).json({ average: 0 });
      }
  
      const sum = ratings.reduce((total, r) => total + r.rating, 0);
      const average = sum / ratings.length;
  
      return res.status(200).json({ average });
    } catch (error) {
      console.error("Error getting average rating:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };