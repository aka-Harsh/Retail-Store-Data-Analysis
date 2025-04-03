// src/services/admin.service.js
import api from '../config/api';

// Admin services
const adminService = {
  // Get sales report
  getSalesReport: async (startDate, endDate) => {
    try {
      const response = await api.get(`/api/admin/reports/sales?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sales report:', error);
      throw error;
    }
  },

  // Get sales forecast
  getSalesForecast: async (forecastType) => {
    try {
      const response = await api.get(`/api/admin/forecasts/sales?forecastType=${forecastType}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sales forecast:', error);
      throw error;
    }
  },

  // Process sales data (manual trigger)
  processSalesData: async () => {
    try {
      await api.post('/api/admin/data/process-sales');
      return true;
    } catch (error) {
      console.error('Failed to process sales data:', error);
      throw error;
    }
  }
};

export default adminService;