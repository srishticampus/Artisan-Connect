const mongoose = require('mongoose');

const paymentTransactionSchema = new mongoose.Schema({
    Buyerid: { type: mongoose.Schema.Types.ObjectId, ref: 'buyers', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'digital_wallet'], required: true },
    transactionStatus: { type: String, enum: ['success', 'failed', 'pending'], required: true },
    transactionId: { type: String, required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('paymentTransactions', paymentTransactionSchema);
  