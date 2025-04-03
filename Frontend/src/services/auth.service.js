// src/services/auth.service.js
import api from '../config/api';

// Authentication services
const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/signin', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to login' };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/signup', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from local storage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Check if user has role
  hasRole: (role) => {
    const user = authService.getCurrentUser();
    if (!user || !user.roles) {
      return false;
    }
    return user.roles.includes(role);
  },

  // Check if user is admin
  isAdmin: () => {
    return authService.hasRole('ROLE_ADMIN');
  }
};

export default authService;