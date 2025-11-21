// src/components/Products/ProductItem.jsx (UPDATED for hover effects)

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    // Card container: Add 'group' class for hover effects on children
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm 
                    hover:shadow-md transition duration-300 flex flex-col cursor-pointer
                    group hover:bg-indigo-600 hover:border-indigo-600"> {/* Hover background and border */}
      
      {/* Link to Product Detail Page */}
      <Link to={`/product/${product.id}`} className="block">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          loading="lazy" 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-1 uppercase font-medium group-hover:text-white transition-colors">
          {product.brand}
        </p>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-white transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-2">
          <p className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">
            ₹{product.price}
          </p>
          
          {/* Add to Cart Button: Adjust text color on hover, background remains. */}
          <button 
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md 
             transition duration-200 text-sm shadow-md border-2 border-transparent group-hover:bg-white group-hover:text-indigo-600 group-hover:border-indigo-600
             hover:text-indigo-800 hover:shadow-lg" // Button changes to white bg, indigo text on card hover
            onClick={handleAddToCart}
          >
            ➕ ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;