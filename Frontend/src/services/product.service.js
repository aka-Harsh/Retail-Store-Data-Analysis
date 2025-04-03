// src/services/product.service.js
import api from '../config/api';

// Product services
const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/api/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${category} products:`, error);
      throw error;
    }
  },

  // Get discounted products
  getDiscountedProducts: async () => {
    try {
      // Since we don't have a direct API for discounted products,
      // we'll get all products and filter on the client side
      const allProducts = await productService.getAllProducts();
      return allProducts.filter(product => product.isDiscounted);
    } catch (error) {
      console.error('Failed to fetch discounted products:', error);
      throw error;
    }
  },

  // Create product (Admin only)
  createProduct: async (productData) => {
    try {
      const response = await api.post('/api/admin/products', productData);
      return response.data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  // Update product (Admin only)
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/api/admin/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw error;
    }
  },

  // Delete product (Admin only)
  deleteProduct: async (id) => {
    try {
      await api.delete(`/api/admin/products/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete product ${id}:`, error);
      throw error;
    }
  }
};

export default productService;