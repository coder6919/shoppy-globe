import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../redux/cartSlice';

// --- Import React Icons ---
import { FaShoppingCart, FaSearch, FaUser, FaRegBuilding, FaQuestionCircle } from 'react-icons/fa';

const Header = () => {
  const totalQuantity = useSelector(selectTotalQuantity);

  const navLinkClass = "text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2";
  const iconLinkClass = "flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1";
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
      <div className={`${containerClass} flex justify-between items-center h-20`}> {/* Increased height for icons */}
        
        {/* Logo/Home Link */}
        <Link to="/" className="text-3xl font-extrabold text-indigo-600 tracking-wider">
          ShoppyGlobe
        </Link>
        
        {/* Navigation Menu (can be expanded for more links) */}
        <nav className="hidden md:flex space-x-4 uppercase">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/products" className={navLinkClass}>Shop</Link>
        </nav>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-6">
          
          {/* Search Icon */}
          <Link to="#" className={iconLinkClass}>
            <FaSearch className="w-5 h-5" />
            <span>Search</span>
          </Link>

          {/* Offers Icon (Placeholder) */}
          <Link to="#" className={iconLinkClass}>
            <FaRegBuilding className="w-5 h-5" /> {/* Using a building icon as placeholder for offers */}
            <span>Offers</span>
          </Link>

          {/* Help Icon (Placeholder) */}
          <Link to="#" className={iconLinkClass}>
            <FaQuestionCircle className="w-5 h-5" />
            <span>Help</span>
          </Link>

          {/* Profile/Sign In Icon */}
          <Link to="#" className={iconLinkClass}>
            <FaUser className="w-5 h-5" />
            <span>Profile</span>
          </Link>

          {/* Cart Icon and Total Quantity */}
          <Link to="/cart" className={`${iconLinkClass} relative`}>
            <FaShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 right-2 inline-flex items-center justify-center 
                             px-2 py-1 text-xs font-bold leading-none text-white transform 
                             translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[20px] h-[20px]">
                {totalQuantity > 99 ? '99+' : totalQuantity}
              </span>
            )}
            <span className="sr-only">Items in cart: {totalQuantity}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;