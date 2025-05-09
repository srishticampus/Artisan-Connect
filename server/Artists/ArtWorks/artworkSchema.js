const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  file: {
    type: Object, // You could also specify fields like filename, path, etc.
    required: true
  },
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'artists',
    required: true // optional but recommended if every work must have an artist
  },
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // match your actual User model name
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      }
    }
  ]
});

module.exports = mongoose.model('artworks', workSchema);
