// src/utils/formatters.js

/**
 * Format currency with specified locale and currency
 * @param {number} amount - Amount to format
 * @param {string} locale - Locale to use (default: 'en-US')
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  };
  
  /**
   * Format date with specified options
   * @param {string|Date} date - Date to format
   * @param {object} options - Date formatting options
   * @returns {string} Formatted date string
   */
  export const formatDate = (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    return new Intl.DateTimeFormat('en-US', mergedOptions).format(new Date(date));
  };
  
  /**
   * Format date and time
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date and time string
   */
  export const formatDateTime = (date) => {
    return formatDate(date, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  /**
   * Truncate text with ellipsis if it exceeds maxLength
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };
  