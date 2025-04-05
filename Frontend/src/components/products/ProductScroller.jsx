import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductScroller = ({ products, showDiscount = false }) => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();

  // Handle marquee-like scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId;
    let position = 0;
    
    const scroll = () => {
      position += 0.5;
      
      // Reset position when all items are scrolled
      if (position >= scrollContainer.scrollWidth / 2) {
        position = 0;
      }
      
      scrollContainer.scrollLeft = position;
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: showDiscount && product.isDiscounted ? product.discountPrice : product.price,
      image: product.imageUrl,
      quantity: 1
    }));
    
    // Show quick feedback
    alert(`${product.name} added to cart!`);
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="overflow-x-auto flex space-x-4 pb-4 no-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Display products twice to create a seamless loop */}
      {[...products, ...products].map((product, index) => (
        <div 
          key={`${product.id}-${index}`}
          className="flex-shrink-0 w-40 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md"
        >
          <div className="p-4 flex flex-col items-center">
            <div className="h-32 w-full bg-gray-200 flex items-center justify-center mb-3">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-3xl">🛒</div>
              )}
            </div>
            <h3 className="font-medium text-center">{product.name}</h3>
            
            {product.isDiscounted && showDiscount ? (
              <div className="mt-2 text-center">
                <span className="line-through text-gray-500">${product.price.toFixed(2)}</span>
                <span className="ml-2 font-bold text-red-600">${product.discountPrice.toFixed(2)}</span>
              </div>
            ) : (
              <div className="mt-2 font-medium text-center">${product.price.toFixed(2)}</div>
            )}
            
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-3 w-full px-3 py-1 bg-green-400 rounded-md text-sm font-medium hover:bg-green-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductScroller;