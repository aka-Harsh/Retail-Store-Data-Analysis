// src/store/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/product.service';

// Async thunks for products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      return await productService.getProductsByCategory(category);
    } catch (error) {
      return rejectWithValue(error.message || `Failed to fetch ${category} products`);
    }
  }
);

export const fetchDiscountedProducts = createAsyncThunk(
  'products/fetchDiscounted',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getDiscountedProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch discounted products');
    }
  }
);

// Admin: Create product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create product');
    }
  }
);

// Admin: Update product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await productService.updateProduct(id, data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product');
    }
  }
);

// Admin: Delete product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

// Initial state
const initialState = {
  allProducts: [],
  categoryProducts: {},
  discountedProducts: [],
  currentProduct: null,
  isLoading: false,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryProducts[action.meta.arg] = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch discounted products
      .addCase(fetchDiscountedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discountedProducts = action.payload;
      })
      .addCase(fetchDiscountedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Create product (admin)
      .addCase(createProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
      })
      
      // Update product (admin)
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          product => product.id === action.payload.id
        );
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
      })
      
      // Delete product (admin)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          product => product.id !== action.payload
        );
      });
  },
});

export const { setCurrentProduct, clearError } = productSlice.actions;

export default productSlice.reducer;