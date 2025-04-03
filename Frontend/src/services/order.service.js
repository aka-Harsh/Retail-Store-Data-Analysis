// src/services/order.service.js
import api from '../config/api';

// Order services
const orderService = {
  // Get user's orders
  getUserOrders: async (email) => {
    try {
      const response = await api.get(`/api/orders/customer/${email}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await api.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      // Transform cart items to order format
      const orderRequest = {
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        shippingAddress: orderData.shippingAddress,
        phoneNumber: orderData.phoneNumber,
        items: orderData.items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };
      
      const response = await api.post('/api/orders', orderRequest);
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  },

  // For admin: get all orders
  getAllOrders: async () => {
    try {
      const response = await api.get('/api/admin/orders');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch all orders:', error);
      throw error;
    }
  },

  // For admin: update order status - Use API gateway with PUT method
  updateOrderStatus: async (id, status) => {
    try {
      console.log(`Updating order ${id} status to ${status}`);
      
      // Use PUT method through API gateway instead of PATCH
      const response = await api.put(`/api/admin/orders/${id}/status?status=${status}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to update order ${id} status:`, error);
      throw error;
    }
  }
};

export default orderService;