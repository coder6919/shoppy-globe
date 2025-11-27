const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');

// All cart routes are protected
router.post('/', protect, addToCart);
router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, removeFromCart);

module.exports = router;