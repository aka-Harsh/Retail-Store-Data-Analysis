import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDiscountedProducts } from '../../store/slices/productSlice';
import ProductCard from '../../components/products/ProductCard';
import Pagination from '../../components/products/Pagination';
import Loader from '../../components/common/Loader';

const DiscountsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  const productsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        
        // Fetch discounted products using Redux action
        const result = await dispatch(fetchDiscountedProducts()).unwrap();
        setProducts(result);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load discounted products. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [dispatch]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Special Offers & Discounts</h1>
        <Loader message="Loading discounted products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Special Offers & Discounts</h1>
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Special Offers & Discounts</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No discounted products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default DiscountsPage;
