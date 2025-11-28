const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); // Import validator
const { registerUser, loginUser } = require('../controllers/authController');

// Route: Register
// Added Validation Middleware array as the second argument
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(), // Checks for @ and domain
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    // Optional: You can enforce complexity (uppercase, symbol) like this:
    // check('password', 'Password must contain a number').matches(/\d/)
  ],
  registerUser
);

// Route: Login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

module.exports = router;