import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { selectCartItems, selectTotalPrice, selectTotalQuantity } from '../../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  if (cartItems.length === 0) {
    return (
      <div className={`${containerClass} py-20 text-center`}>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Bag is Empty 🛍️</h1>
        <p className="text-lg text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="inline-block py-3 px-8 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className={`${containerClass} py-8`}>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping Bag ({totalQuantity} Items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List (Left Column) */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-md divide-y divide-gray-200">
          {/* React Lists: Render the list of cart items (10 marks) */}
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} /> 
          ))}
        </div>

        {/* Price Summary (Right Column) */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-20">
            <h2 className="text-xl font-bold uppercase mb-4 pb-2 border-b">Price Details</h2>
            
            {/* Price breakdown */}
            <div className="space-y-2 text-gray-800">
              <div className="flex justify-between text-lg">
                <span>Total Items ({totalQuantity})</span>
                <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-lg">
                <span>Discount</span>
                <span className="text-green-600 font-semibold">-₹0.00</span> 
              </div>

              <div className="flex justify-between text-xl border-t pt-3 font-bold mt-4">
                <span>Total Payable</span>
                <span className="text-indigo-600">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link 
              to="/checkout"
              className="mt-6 w-full flex justify-center py-3 bg-indigo-600 text-white font-bold text-lg rounded-md hover:bg-indigo-700 transition uppercase tracking-wider shadow-md"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;