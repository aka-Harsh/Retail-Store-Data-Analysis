// src/pages/customer/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/slices/userSlice';
import OrderHistory from '../../components/profile/OrderHistory';
import Loader from '../../components/common/Loader';
import orderService from '../../services/order.service';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
  const user = useSelector(state => state.user);
  const { user: authUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    gender: user.gender,
    phone: user.phone,
  });
  
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { requireAuth } = useAuth();

  // Ensure user is logged in
  useEffect(() => {
    requireAuth();
  }, [requireAuth]);
  
  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!authUser || !authUser.email) return;
      
      try {
        setIsLoading(true);
        const fetchedOrders = await orderService.getUserOrders(authUser.email);
        
        // Convert to format expected by OrderHistory component
        const formattedOrders = fetchedOrders.map(order => ({
          id: order.id,
          date: order.orderDate,
          status: order.status,
          total: order.totalAmount,
          items: order.items.map(item => ({
            id: item.id,
            name: item.productName,
            quantity: item.quantity,
            price: item.unitPrice
          }))
        }));
        
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load your order history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [authUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };
  
  if (!authUser) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Profile Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-green-400 rounded-md text-sm hover:bg-green-500"
              >
                Edit
              </button>
            )}
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-400 rounded-md hover:bg-green-500"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-4">
                <p className="text-gray-600 mb-1 text-sm">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1 text-sm">Age</p>
                <p className="font-medium">{user.age}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1 text-sm">Gender</p>
                <p className="font-medium">{user.gender}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1 text-sm">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1 text-sm">Email</p>
                <p className="font-medium">{authUser.email}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-1 text-sm">Username</p>
                <p className="font-medium">{authUser.username}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Order History Section - Takes up 2/3 of the grid on medium+ screens */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          {isLoading ? (
            <Loader message="Loading your order history..." />
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>{error}</p>
            </div>
          ) : (
            <OrderHistory orders={orders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;