// src/utils/validators.js

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} Validation result with isValid flag and message
   */
  export const validatePassword = (password) => {
    if (!password || password.length < 6) {
      return {
        isValid: false,
        message: 'Password must be at least 6 characters long'
      };
    }
    
    return {
      isValid: true,
      message: 'Password is valid'
    };
  };
  
  /**
   * Validate that passwords match
   * @param {string} password - Original password
   * @param {string} confirmPassword - Confirmation password
   * @returns {boolean} Whether passwords match
   */
  export const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  /**
   * Validate a phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Whether phone number is valid
   */
  export const isValidPhone = (phone) => {
    // Basic validation for demonstration purposes
    // In a real app, you might want to use a library like libphonenumber-js
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };
  
  /**
   * Check if a form field is empty
   * @param {string} value - Field value to check
   * @returns {boolean} Whether field is empty
   */
  export const isEmpty = (value) => {
    return value === undefined || value === null || value.trim() === '';
  };
  