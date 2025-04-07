// src/pages/customer/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCart } from '../../store/slices/cartSlice';
import { fetchAllProducts } from '../../store/slices/productSlice';
import ProductCard from '../../components/products/ProductCard';
import { getTrendingProducts } from '../../services/recommendationService';
import productService from '../../services/product.service';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discountedItems, setDiscountedItems] = useState([]);
  const [regularItems, setRegularItems] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all products via Redux action
        await dispatch(fetchAllProducts()).unwrap();
        
        // Get all products from API
        const allProducts = await productService.getAllProducts();
        
        // Filter discounted and regular items
        const discounted = allProducts.filter(item => item.isDiscounted);
        const regular = allProducts.filter(item => !item.isDiscounted);
        
        // Get trending products
        const trending = await getTrendingProducts(4);
        
        setDiscountedItems(discounted);
        setRegularItems(regular);
        setTrendingProducts(trending);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const productWithCorrectPrice = {
      ...product,
      price: product.isDiscounted ? product.discountPrice : product.price
    };
    
    dispatch(addToCart(productWithCorrectPrice));
    alert(`${product.name} added to cart!`);
  };

  const categories = [
    { 
      id: 1, 
      name: 'Fruits & Vegetables', 
      path: '/fruits-veggies', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEr9mvCinBXTTYWxOhXuRooZ3W8d3qw5m9pA&s'
    },
    { 
      id: 2, 
      name: 'Snacks', 
      path: '/snacks', 
      image: 'https://feeds.abplive.com/onecms/images/uploaded-images/2022/04/22/f92e4c25ef141fb6efd4d359386cf03f_original.JPG?impolicy=abp_cdn&imwidth=1200'
    },
    { 
      id: 3, 
      name: 'Cold Drinks', 
      path: '/cold-drinks', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPA_C1LIYEFczrc0sHQFcNj7WyRXsmqmh6Bg&s'
    },
    { 
      id: 4, 
      name: 'Dairy Products', 
      path: '/dairy-products', 
      image: 'https://static.toiimg.com/thumb/msid-108571967,width-1280,height-720,imgsize-83482,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'
    },
  ];

  const SimpleProductCard = ({ product }) => (
    <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md mx-4 my-2">
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
        <h3 className="font-medium text-center text-base">{product.name}</h3>
        
        {product.isDiscounted ? (
          <div className="mt-2 text-center">
            <span className="line-through text-gray-500">${product.price.toFixed(2)}</span>
            <span className="ml-2 font-bold text-red-600">${product.discountPrice.toFixed(2)}</span>
            <span className="text-xs text-gray-500 block">{product.unit}</span>
          </div>
        ) : (
          <div className="mt-2 font-medium text-center">
            ${product.price.toFixed(2)}
            <span className="text-xs text-gray-500 block">{product.unit}</span>
          </div>
        )}
        
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-3 w-full px-3 py-2 bg-green-400 rounded-md font-medium hover:bg-green-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-green-500" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-4">
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => navigate(category.path)}
            className="relative rounded-lg overflow-hidden h-40 cursor-pointer shadow-md transition-transform hover:scale-105"
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold text-center">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
      
      {/* Trending Products */}
      <div className="mb-10">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <span className="ml-2 text-2xl">🔥</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Ultra Discount Section */}
      <div className="mb-10">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold">Ultra Discount</h2>
          <span className="ml-2 text-2xl">🏷️</span>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            {discountedItems.concat(discountedItems).map((product, index) => (
              <SimpleProductCard key={`discount-${product.id}-${index}`} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Daily Items Section */}
      <div className="mb-10">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold">Daily Items</h2>
          <span className="ml-2 text-2xl">🛒</span>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex animate-marquee">
            {regularItems.concat(regularItems).map((product, index) => (
              <SimpleProductCard key={`regular-${product.id}-${index}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;