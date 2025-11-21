
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, selectCartItems, selectTotalPrice } from '../redux/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  // Local state for the dummy form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Order Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // 1. Display message (simulated success)
    setIsOrderPlaced(true);

    // 2. Empty the cart (Redux)
    dispatch(clearCart());

    // 3. Redirect the user back to the Home page automatically (Routing)
    setTimeout(() => {
      navigate('/');
    }, 3000); 
  };

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className={`${containerClass} py-20 text-center`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-gray-500">Please add items to proceed to checkout.</p>
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className={`${containerClass} py-20 text-center bg-green-50 rounded-xl shadow-xl`}>
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Order Placed Successfully!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Thank you for shopping with ShoppyGlobe. Your cart has been emptied.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to the Home page in 3 seconds...
        </p>
      </div>
    );
  }

  return (
    <div className={`${containerClass} py-8`}>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Dummy Shipping Form */}
        <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">1. Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            
            {/* Input Fields */}
            {['name', 'email', 'address', 'city'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  id={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold text-lg rounded-md hover:bg-indigo-700 transition uppercase tracking-wider mt-6 shadow-md"
            >
              PLACE ORDER (₹{totalPrice.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-20">
            <h2 className="text-xl font-bold uppercase mb-4 pb-2 border-b">2. Order Summary</h2>
            
            {/* Item List Summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4 border-b pb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 line-clamp-1">
                    {item.title} x {item.quantity}
                  </span>
                  <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Final Totals */}
            <div className="space-y-2 text-gray-800">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Payable</span>
                <span className="text-indigo-600">₹{totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 pt-1">
                By clicking 'PLACE ORDER', you agree to ShoppyGlobe's terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;