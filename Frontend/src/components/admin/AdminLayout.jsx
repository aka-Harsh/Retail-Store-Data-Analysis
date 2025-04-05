// src/components/admin/AdminLayout.jsx
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const AdminLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-md z-10">
        <div className="flex flex-col h-full py-4">
          <div className="px-6 py-4 border-b">
            <div className="text-2xl font-bold">
              <span className="text-green-400">Blink</span>
              <span className="text-yellow-300">It</span>
              <span className="ml-2 text-gray-600 text-lg">Admin</span>
            </div>
          </div>
          
          <div className="py-4 flex-grow">
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => 
                `flex items-center px-6 py-3 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              <span className="mr-3">📊</span>
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/admin/products" 
              className={({ isActive }) => 
                `flex items-center px-6 py-3 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              <span className="mr-3">🛒</span>
              <span>Products</span>
            </NavLink>
            
            <NavLink 
              to="/admin/orders" 
              className={({ isActive }) => 
                `flex items-center px-6 py-3 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              <span className="mr-3">📦</span>
              <span>Orders</span>
            </NavLink>
            
            <NavLink 
              to="/admin/reports" 
              className={({ isActive }) => 
                `flex items-center px-6 py-3 ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`
              }
            >
              <span className="mr-3">📈</span>
              <span>Reports</span>
            </NavLink>
          </div>
          
          <div className="border-t px-6 py-4">
            <Link 
              to="/"
              className="flex items-center py-2 text-gray-700 hover:text-green-500"
            >
              <span className="mr-3">🏠</span>
              <span>Visit Store</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center py-2 text-gray-700 hover:text-red-500"
            >
              <span className="mr-3">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-4">
              Welcome, {user?.username || 'Admin'}
            </div>
            <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;