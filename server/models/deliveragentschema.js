const mongoose = require('mongoose');

const deliveryAgentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    photo: { type: String },
    vehicleRegistrationNumber: { type: String, required: true },
    licenseUpload: { type: String },
    password: { type: String, required: true },
    vehicleDetails: {
        type: { type: String },
        numberPlate: { type: String },
    },
    availability: { type: Boolean, required: true },
    completedDeliveries: Number,
    earnings: Number,
}, { timestamps: true });

module.exports = mongoose.model('deliveryAgents', deliveryAgentSchema);