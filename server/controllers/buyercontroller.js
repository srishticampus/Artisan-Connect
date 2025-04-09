const Buyer =require("../models/buyerschema")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Environment secret key (set this in your .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Create new buyer
exports.createBuyer = async (req, res) => {
    console.log(req.body);
  try {
    const { name, email, password, contactNumber, address, profileImage } = req.body;

    // Check if user already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) return res.status(400).json({ message: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newBuyer = new Buyer({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      address,
      profileImage,
    });

    const savedBuyer = await newBuyer.save();
    res.status(201).json(savedBuyer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login buyer
exports.loginBuyer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyer = await Buyer.findOne({ email });
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: buyer._id, role: buyer.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all buyers
exports.getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get buyer by ID
exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
    res.status(200).json(buyer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update buyer details
exports.updateBuyer = async (req, res) => {
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBuyer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deactivate buyer (set a flag or remove)
exports.deactivateBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.status(200).json({ message: 'Buyer deactivated', buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Activate buyer
exports.activateBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    res.status(200).json({ message: 'Buyer activated', buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
