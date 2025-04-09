const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'buyers', required: true },
    artisanId: { type: mongoose.Schema.Types.ObjectId, ref: 'artisans', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: Number,
            price: Number,
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], required: true },
    deliveryAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'deliveryAgents' },
    shippingAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: ['paid', 'pending', 'failed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('orders', orderSchema);