// src/components/admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/admin.service';
import orderService from '../../services/order.service';
import productService from '../../services/product.service';

const Dashboard = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    totalSales: 0,
    pendingOrders: 0
  });
  
  const [salesForecast, setSalesForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get sales forecast
        const forecast = await adminService.getSalesForecast('weekly');
        
        // Get all products
        const products = await productService.getAllProducts();
        
        // Get all orders
        const orders = await orderService.getAllOrders();
        
        // Calculate stats
        const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        setStats({
          productCount: products.length,
          orderCount: orders.length,
          totalSales,
          pendingOrders
        });
        
        setSalesForecast(forecast);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-green-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <span className="text-2xl">🛒</span>
            </div>
            <div>
              <p className="text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{stats.productCount}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/products" className="text-green-500 hover:underline text-sm">
              Manage Products →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{stats.orderCount}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/orders" className="text-blue-500 hover:underline text-sm">
              View All Orders →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/reports" className="text-yellow-500 hover:underline text-sm">
              View Reports →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-500 mr-4">
              <span className="text-2xl">⏳</span>
            </div>
            <div>
              <p className="text-gray-500">Pending Orders</p>
              <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/orders?status=PENDING" className="text-orange-500 hover:underline text-sm">
              Process Orders →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Sales Forecast */}
      {salesForecast && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Sales Forecast</h3>
          <p className="text-gray-600 mb-4">
            Predicted sales for {salesForecast.forecastDate}: <span className="font-bold">{formatCurrency(salesForecast.predictedTotal)}</span>
          </p>
          
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">By Category</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(salesForecast.forecastByCategory).map(([category, amount]) => (
                <div key={category} className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-500">{category}</p>
                  <p className="font-bold">{formatCurrency(amount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/admin/products/new"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md text-center font-medium"
          >
            Add New Product
          </Link>
          <Link 
            to="/admin/reports"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center font-medium"
          >
            Generate Reports
          </Link>
          <button 
            onClick={async () => {
              try {
                await adminService.processSalesData();
                alert('Sales data processed successfully!');
              } catch (error) {
                alert('Failed to process sales data.');
              }
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-md text-center font-medium"
          >
            Process Sales Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;