import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTotalQuantity } from '../../redux/cartSlice';
import { selectIsAuthenticated, logout } from '../../redux/authSlice';

// --- Import React Icons ---
import { FaShoppingCart, FaSearch, FaUser, FaRegBuilding, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; 

const Header = () => {
  const totalQuantity = useSelector(selectTotalQuantity);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinkClass = "text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2";
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
      <div className={`${containerClass} flex justify-between items-center h-20`}> 
        
        {/* LEFT SIDE: Logo & Navigation */}
        <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl sm:text-3xl font-extrabold text-indigo-600 tracking-wider flex-shrink-0">
              ShoppyGlobe
            </Link>
            
            <nav className="hidden md:flex space-x-4 uppercase">
              <Link to="/" className={navLinkClass}>Home</Link>
              <Link to="/products" className={navLinkClass}>Shop</Link>
            </nav>
        </div>

        {/* RIGHT SIDE: Icons */}
        <div className="flex items-center space-x-4 flex-shrink-0"> 
          
          <Link to="#" className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1">
            <FaSearch className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </Link>

          <Link to="/cart" className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1 relative">
            <FaShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 right-2 inline-flex items-center justify-center 
                             px-2 py-1 text-xs font-bold leading-none text-white transform 
                             translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[18px] h-[18px]">
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
          </Link>

          {/* Conditional Rendering based on Auth Status */}
          {isAuthenticated ? (
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-red-600 transition-colors text-xs space-y-1"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link to="/login" className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1">
              <FaSignInAlt className="w-5 h-5" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;