// src/components/admin/ProductForm.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/slices/productSlice';

const ProductForm = ({ product, onClose }) => {
  const isEditing = !!product;
  const dispatch = useDispatch();
  
  // Initialize form with product data or defaults
  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    discountPrice: product?.discountPrice || '',
    unit: product?.unit || '',
    isDiscounted: product?.isDiscounted || false,
    imageUrl: product?.imageUrl || '',
    category: product?.category || 'fruitsVeggies',
    nutritionInfo: product?.nutritionInfo || {
      calories: '',
      carbs: '',
      protein: '',
      fat: '',
      fiber: '',
      vitamins: ''
    },
    ingredients: product?.ingredients || '',
    shelfLife: product?.shelfLife || '',
    countryOfOrigin: product?.countryOfOrigin || '',
    seller: product?.seller || '',
    tags: product?.tags ? product.tags.join(', ') : ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('nutritionInfo.')) {
      const nutritionField = name.split('.')[1];
      setFormData({
        ...formData,
        nutritionInfo: {
          ...formData.nutritionInfo,
          [nutritionField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    // Price validation
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    // Discount price validation (only if isDiscounted is true)
    if (formData.isDiscounted) {
      if (!formData.discountPrice) {
        newErrors.discountPrice = 'Discount price is required';
      } else if (isNaN(formData.discountPrice) || parseFloat(formData.discountPrice) <= 0) {
        newErrors.discountPrice = 'Discount price must be a positive number';
      } else if (parseFloat(formData.discountPrice) >= parseFloat(formData.price)) {
        newErrors.discountPrice = 'Discount price must be less than regular price';
      }
    }
    
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process tags from comma-separated string to array
      const tagsArray = formData.tags.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Prepare data for submission
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.isDiscounted ? parseFloat(formData.discountPrice) : 0,
        tags: tagsArray
      };
      
      if (isEditing) {
        // If editing, update the product
        await dispatch(updateProduct({ id: product.id, data: productData })).unwrap();
      } else {
        // If adding new, create the product
        await dispatch(createProduct(productData)).unwrap();
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save product:', error);
      setErrors({
        submit: 'Failed to save product. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {errors.submit && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full px-4 py-2 border ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price* ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-2 border ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                      Unit* (e.g., kg, pack)
                    </label>
                    <input
                      type="text"
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${
                        errors.unit ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
                    />
                    {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDiscounted"
                      name="isDiscounted"
                      checked={formData.isDiscounted}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-400 border-gray-300 rounded"
                    />
                    <label htmlFor="isDiscounted" className="ml-2 block text-sm text-gray-700">
                      Apply Discount
                    </label>
                  </div>
                </div>

                {formData.isDiscounted && (
                  <div className="mb-4">
                    <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Price* ($)
                    </label>
                    <input
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-2 border ${
                        errors.discountPrice ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
                    />
                    {errors.discountPrice && <p className="text-red-500 text-sm mt-1">{errors.discountPrice}</p>}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
                  >
                    <option value="fruitsVeggies">Fruits & Vegetables</option>
                    <option value="snacks">Snacks</option>
                    <option value="coldDrinks">Cold Drinks</option>
                    <option value="dairyProducts">Dairy Products</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>

                <div className="mb-4">
                  <label htmlFor="seller" className="block text-sm font-medium text-gray-700 mb-1">
                    Seller
                  </label>
                  <input
                    type="text"
                    id="seller"
                    name="seller"
                    value={formData.seller}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="countryOfOrigin" className="block text-sm font-medium text-gray-700 mb-1">
                    Country of Origin
                  </label>
                  <input
                    type="text"
                    id="countryOfOrigin"
                    name="countryOfOrigin"
                    value={formData.countryOfOrigin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="shelfLife" className="block text-sm font-medium text-gray-700 mb-1">
                    Shelf Life
                  </label>
                  <input
                    type="text"
                    id="shelfLife"
                    name="shelfLife"
                    value={formData.shelfLife}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredients
                  </label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="e.g., fruit, healthy, snack"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <h4 className="text-md font-semibold mb-2 mt-6">Nutrition Information</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="nutritionInfo.calories" className="block text-sm font-medium text-gray-700 mb-1">
                      Calories
                    </label>
                    <input
                      type="text"
                      id="nutritionInfo.calories"
                      name="nutritionInfo.calories"
                      value={formData.nutritionInfo.calories}
                      onChange={handleChange}
                      placeholder="e.g., 52 per 100g"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="nutritionInfo.carbs" className="block text-sm font-medium text-gray-700 mb-1">
                      Carbs
                    </label>
                    <input
                      type="text"
                      id="nutritionInfo.carbs"
                      name="nutritionInfo.carbs"
                      value={formData.nutritionInfo.carbs}
                      onChange={handleChange}
                      placeholder="e.g., 14g"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="nutritionInfo.protein" className="block text-sm font-medium text-gray-700 mb-1">
                      Protein
                    </label>
                    <input
                      type="text"
                      id="nutritionInfo.protein"
                      name="nutritionInfo.protein"
                      value={formData.nutritionInfo.protein}
                      onChange={handleChange}
                      placeholder="e.g., 0.3g"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="nutritionInfo.fat" className="block text-sm font-medium text-gray-700 mb-1">
                      Fat
                    </label>
                    <input
                      type="text"
                      id="nutritionInfo.fat"
                      name="nutritionInfo.fat"
                      value={formData.nutritionInfo.fat}
                      onChange={handleChange}
                      placeholder="e.g., 0.2g"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="nutritionInfo.fiber" className="block text-sm font-medium text-gray-700 mb-1">
                      Fiber
                    </label>
                    <input
                      type="text"
                      id="nutritionInfo.fiber"
                      name="nutritionInfo.fiber"
                      value={formData.nutritionInfo.fiber}
                      onChange={handleChange}
                      placeholder="e.g., 2.4g"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="nutritionInfo.vitamins" className="block text-sm font-medium text-gray-700 mb-1">
                      Vitamins
                    </label>
                    <input
                      type="text"
                      id="nutritionInfo.vitamins"
                      name="nutritionInfo.vitamins"
                      value={formData.nutritionInfo.vitamins}
                      onChange={handleChange}
                      placeholder="e.g., Vitamin C, Vitamin K"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 border-t pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;