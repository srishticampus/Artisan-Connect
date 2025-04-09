const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },

  fullName: { type: String, required: true },
  storeName: { type: String, required: true },
  businessDescription: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  photo: { type: String }, // profile photo
  password: { type: String, required: true },
  storeLogo: { type: Object, required: true },
  ratings: {
    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  paymentDetails: {
    bankName: String,
    accountNumber: String,
    ifsc: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('artisans', artisanSchema);
