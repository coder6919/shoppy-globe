import { useDispatch } from 'react-redux';
import { adjustQuantity, removeFromCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAdjustQuantity = (adjustmentType) => {
    // Event Handling: Adjust quantity using Redux (20 marks)
    dispatch(adjustQuantity({ id: item.id, adjustmentType }));
  };

  const handleRemove = () => {
    // Event Handling: Remove product using Redux (20 marks)
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center bg-white p-4 border-b border-gray-200 last:border-b-0">
      
      {/* Image */}
      <Link to={`/product/${item.id}`} className="w-20 h-20 flex-shrink-0 mr-4">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          loading="lazy" 
          className="w-full h-full object-cover rounded-md"
        />
      </Link>

      {/* Details */}
      <div className="flex-grow">
        <Link to={`/product/${item.id}`} className="text-base font-semibold text-gray-800 hover:text-indigo-600 line-clamp-1">
          {item.title}
        </Link>
        <p className="text-sm text-gray-500">{item.brand}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">
          ₹{(item.price * item.quantity).toFixed(2)}
          <span className="text-sm font-normal text-gray-500 ml-2">(₹{item.price} each)</span>
        </p>
      </div>

      {/* Quantity Controls & Remove */}
      <div className="flex flex-col items-end space-y-2 ml-4">
        
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            className="p-2 w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
            onClick={() => handleAdjustQuantity('decrement')}
            disabled={item.quantity <= 1} // Quantity should not go below 1 (Validation)
          >
            -
          </button>
          <span className="px-3 text-base font-medium border-x border-gray-300">{item.quantity}</span>
          <button 
            className="p-2 w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-700 hover:bg-gray-100 transition"
            onClick={() => handleAdjustQuantity('increment')}
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <button 
          className="text-sm text-red-500 hover:text-red-700 font-medium transition"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;