
// src/utils/constants.js

// API Constants
export const API_BASE_URL = 'http://localhost:8089';
export const API_TIMEOUT = 10000; // 10 seconds

// Route Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  CART: '/cart',
  ITEMS: '/items',
  DISCOUNTS: '/discounts',
  FRUITS_VEGGIES: '/fruits-veggies',
  SNACKS: '/snacks',
  COLD_DRINKS: '/cold-drinks',
  DAIRY_PRODUCTS: '/dairy-products',
  ADMIN: {
    DASHBOARD: '/admin',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    REPORTS: '/admin/reports'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart'
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  FRUITS_VEGGIES: 'fruitsVeggies',
  SNACKS: 'snacks',
  COLD_DRINKS: 'coldDrinks',
  DAIRY_PRODUCTS: 'dairyProducts'
};

// Order Statuses
export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'ROLE_ADMIN',
  CUSTOMER: 'ROLE_CUSTOMER'
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERAL: 'Something went wrong. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  NETWORK: 'Network error. Please check your internet connection.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ORDER_PLACED: 'Your order has been placed successfully!',
  PROFILE_UPDATED: 'Your profile has been updated successfully!',
  ITEM_ADDED: 'Item added to cart!',
  REGISTRATION_SUCCESS: 'Registration successful! Please log in.'
};

// Pagination
export const PAGINATION = {
  ITEMS_PER_PAGE: 8
};
