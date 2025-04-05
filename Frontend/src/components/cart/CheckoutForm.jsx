
// src/components/cart/CheckoutForm.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CheckoutForm = ({ onSubmit, onCancel, isSubmitting, error }) => {
  const { user } = useSelector(state => state.auth);
  const { total } = useSelector(state => state.cart);
  
  const [formData, setFormData] = useState({
    customerName: user?.username || '',
    customerEmail: user?.email || '',
    shippingAddress: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name*
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Shipping Address*
          </label>
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Back to Cart
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-green-400 rounded-md font-bold hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;