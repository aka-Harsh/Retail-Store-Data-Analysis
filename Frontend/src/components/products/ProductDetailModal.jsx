import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductDetailModal = ({ product, onClose, recommendedProducts, onSelectRecommended }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.isDiscounted ? product.discountPrice : product.price,
      image: product.imageUrl,
      quantity: quantity
    }));
    alert(`${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.name} added to cart!`);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold z-10"
        >
          ✕
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg flex items-center justify-center h-80 overflow-hidden">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <div className="text-6xl text-gray-400">🛒</div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            {/* Price */}
            <div className="mb-4">
              {product.isDiscounted ? (
                <div className="flex items-baseline">
                  <span className="line-through text-gray-500 mr-2">${product.price.toFixed(2)}</span>
                  <span className="text-2xl font-bold text-red-600">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-gray-500 ml-2">{product.unit}</span>
                </div>
              ) : (
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 ml-2">{product.unit}</span>
                </div>
              )}
            </div>
            
            {/* Add to Cart */}
            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md mr-4">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 border-r"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 border-l"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="bg-green-400 hover:bg-green-500 text-white py-2 px-6 rounded-md font-medium"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Additional Information */}
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600">Seller</div>
                <div>{product.seller}</div>
                
                <div className="text-gray-600">Unit</div>
                <div>{product.unit}</div>
                
                <div className="text-gray-600">Country of Origin</div>
                <div>{product.countryOfOrigin}</div>
                
                <div className="text-gray-600">Shelf Life</div>
                <div>{product.shelfLife}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for Nutrition and Ingredients */}
        <div className="px-6 pb-6">
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold mb-3">Nutrition Information</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Calories</div>
                <div className="font-medium">{product.nutritionInfo.calories}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Protein</div>
                <div className="font-medium">{product.nutritionInfo.protein}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="font-medium">{product.nutritionInfo.carbs}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Fat</div>
                <div className="font-medium">{product.nutritionInfo.fat}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Fiber</div>
                <div className="font-medium">{product.nutritionInfo.fiber}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">Vitamins</div>
                <div className="font-medium">{product.nutritionInfo.vitamins}</div>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-3">Ingredients</h3>
            <p className="text-gray-700 mb-6">{product.ingredients}</p>
          </div>
        </div>
        
        {/* Recommended Products */}
        {recommendedProducts && recommendedProducts.length > 0 && (
          <div className="bg-gray-50 p-6">
            <h3 className="text-lg font-bold mb-4">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedProducts.map(recProduct => (
                <div 
                  key={recProduct.id} 
                  className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSelectRecommended(recProduct)}
                >
                  <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden mb-2">
                    {recProduct.imageUrl ? (
                      <img src={recProduct.imageUrl} alt={recProduct.name} className="h-full object-cover" />
                    ) : (
                      <div className="text-2xl text-gray-400">🛒</div>
                    )}
                  </div>
                  <h4 className="font-medium text-sm leading-tight">{recProduct.name}</h4>
                  <div className="text-xs mt-1">
                    {recProduct.isDiscounted ? (
                      <span className="text-red-600 font-medium">${recProduct.discountPrice.toFixed(2)}</span>
                    ) : (
                      <span>${recProduct.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;