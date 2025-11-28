import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { selectIsAuthenticated } from '../redux/authSlice';

const ProductDetail = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const containerClass = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"; 

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      
      // Updated to use Local Backend
      const API_URL = `http://localhost:8000/api/products/${id}`;

      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product with ID ${id}. Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please login to add items to your cart!");
      navigate('/login');
      return;
    }

    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return (
      <div className={`${containerClass} py-20 text-center text-xl font-medium text-gray-700`}>
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`${containerClass} py-20 text-center text-xl font-bold text-red-600`}>
        ❌ Error: {error || 'Product not found.'}
      </div>
    );
  }

  return (
    <div className={`${containerClass} py-8`}>
      <div className="bg-white p-6 md:p-10 shadow-lg rounded-xl flex flex-col lg:flex-row gap-10">
        
        <div className="lg:w-1/2">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            loading="lazy"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col">
          <p className="text-sm font-semibold uppercase text-gray-500 mb-1">{product.brand}</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-4 border-b pb-4">{product.description}</p>
          
          <div className="flex items-baseline mb-6">
            <span className="text-5xl font-extrabold text-indigo-600 mr-3">₹{product.price}</span>
            <span className="text-lg text-green-600 font-semibold">({product.discountPercentage}% OFF)</span>
          </div>

          <p className="text-base text-gray-500 mb-4">
            Stock: <span className={`font-bold ${product.stock > 10 ? 'text-green-500' : 'text-orange-500'}`}>
              {product.stock} items left
            </span>
          </p>

          <button 
            className="w-full py-3 bg-indigo-600 text-white font-bold text-lg rounded-md hover:bg-indigo-700 transition duration-200 shadow-md uppercase tracking-wider mt-auto"
            onClick={handleAddToCart}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;