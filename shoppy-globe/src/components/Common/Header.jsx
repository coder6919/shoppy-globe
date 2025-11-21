import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../../redux/cartSlice';

// --- Import React Icons ---
import { FaShoppingCart, FaSearch, FaUser, FaRegBuilding, FaQuestionCircle } from 'react-icons/fa'; 

const Header = () => {
  const totalQuantity = useSelector(selectTotalQuantity);

  // Nav links are now hidden on mobile (sm:hidden)
  const navLinkClass = "text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2";
  
  // Icon links use smaller text and tighter spacing on mobile
  // Added 'hidden sm:flex' to hide redundant text links on small screens
  const iconLinkClass = "flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1";
  
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10 border-b border-gray-200">
      <div className={`${containerClass} flex justify-between items-center h-20`}> 
        
        {/* LEFT SIDE: Logo & Navigation */}
        <div className="flex items-center space-x-6">
            {/* Logo/Home Link */}
            <Link to="/" className="text-xl sm:text-3xl font-extrabold text-indigo-600 tracking-wider flex-shrink-0">
              ShoppyGlobe
            </Link>
            
            {/* Navigation Menu - HIDDEN ON MOBILE */}
            <nav className="hidden md:flex space-x-4 uppercase">
              <Link to="/" className={navLinkClass}>Home</Link>
              <Link to="/products" className={navLinkClass}>Shop</Link>
            </nav>
        </div>

        {/* RIGHT SIDE: Icons (Adjusted spacing and sizing for mobile) */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0"> 
          
          {/* Search Icon - Hidden text on small screens, smaller icon size */}
          <Link to="#" className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1">
            <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Search</span>
          </Link>

          {/* Offers Icon (Placeholder) - HIDDEN ON MOBILE to save space */}
          <Link to="#" className="hidden sm:flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1">
            <FaRegBuilding className="w-5 h-5" /> 
            <span>Offers</span>
          </Link>

          {/* Profile Icon */}
          <Link to="#" className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1">
            <FaUser className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Profile</span>
          </Link>

          {/* Cart Icon and Total Quantity */}
          <Link to="/cart" className="flex flex-col items-center justify-center p-1 text-gray-700 hover:text-indigo-600 transition-colors text-xs space-y-1 relative">
            <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Cart</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 right-2 inline-flex items-center justify-center 
                             px-2 py-1 text-xs font-bold leading-none text-white transform 
                             translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[18px] h-[18px]">
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