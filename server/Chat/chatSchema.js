const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'fromRole'
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'toRole'
    },
    fromRole: {
      type: String,
      required: true,
      enum: ['users', 'artists']
    },
    toRole: {
      type: String,
      required: true,
      enum: ['users', 'artists']
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'artworks',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', chatSchema);
