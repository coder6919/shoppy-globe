const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // Import validation result handler

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/register
exports.registerUser = async (req, res) => {
  // 1. Check for Validation Errors from the route
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return specific validation errors (e.g., "Invalid Email")
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // 2. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // 3. Create user
    const user = await User.create({ username, email, password });

    if (user) {
      // FIX: Do NOT return token here. Just success message.
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        message: "Registration successful! Please log in to get access."
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/login
exports.loginUser = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    // FIX: Specific error messages as requested
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Check password
    if (await user.matchPassword(password)) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id), // Token is ONLY generated here now
      });
    } else {
      res.status(401).json({ message: 'Incorrect password' }); // Specific error message
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};