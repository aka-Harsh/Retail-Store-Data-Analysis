import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import ProductDetailModal from './ProductDetailModal';
import { getRecommendations } from '../../services/recommendationService';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the button
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.isDiscounted ? product.discountPrice : product.price,
      image: product.imageUrl,
      quantity: 1
    }));
    alert(`${product.name} added to cart!`);
  };

  const openProductDetails = async () => {
    setCurrentProduct(product);
    try {
      const recommendations = await getRecommendations(product);
      setRecommendedProducts(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendedProducts([]);
    }
    setShowModal(true);
  };

  const handleSelectRecommended = async (recommendedProduct) => {
    setCurrentProduct(recommendedProduct);
    try {
      const recommendations = await getRecommendations(recommendedProduct);
      setRecommendedProducts(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setRecommendedProducts([]);
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={openProductDetails}
      >
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center p-4">
              <p>Image placeholder</p>
              <p className="text-sm">(Add image URL in products.json)</p>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2 h-10">{product.description}</p>
          
          <div className="flex items-center mb-3">
            {product.isDiscounted ? (
              <>
                <span className="line-through text-gray-500 mr-2">${product.price.toFixed(2)}</span>
                <span className="text-red-600 font-bold">${product.discountPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold">${product.price.toFixed(2)}</span>
            )}
            <span className="text-gray-500 text-sm ml-1">({product.unit})</span>
          </div>
          
          <button
            className="w-full bg-green-400 hover:bg-green-500 text-white py-2 rounded-md font-medium transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      {showModal && (
        <ProductDetailModal 
          product={currentProduct}
          recommendedProducts={recommendedProducts}
          onClose={() => setShowModal(false)}
          onSelectRecommended={handleSelectRecommended}
        />
      )}
    </>
  );
};

export default ProductCard;