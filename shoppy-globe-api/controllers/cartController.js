const Cart = require('../models/Cart.model'); // Ensure filename matches what you renamed!
const Product = require('../models/Product.model');

// @desc    Add item to cart
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Comes from authMiddleware

  try {
    // 1. Validate Product Exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Find Cart for User
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Cart exists -> Check if product is already in cart
      const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in cart -> Update quantity
        cart.products[itemIndex].quantity += quantity;
      } else {
        // Product not in cart -> Push new item
        cart.products.push({ productId, quantity });
      }
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      // No cart exists -> Create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity }]
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id (ID here is Product ID)
exports.updateCartItem = async (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
      cart = await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id (ID here is Product ID)
exports.removeFromCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    
    cart = await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};