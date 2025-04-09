const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'senderModel'
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['buyers', 'artisans']
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'receiverModel'
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ['buyers', 'artisans']
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });
  
  module.exports = mongoose.model('messages', messageSchema);
  
