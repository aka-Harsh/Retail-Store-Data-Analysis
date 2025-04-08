// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector } from 'react-redux';

// Layouts
import Layout from './components/common/Layout';
import AdminLayout from './components/admin/AdminLayout';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AuthGuard from './components/auth/AuthGuard';

// Customer Pages
import Home from './pages/customer/Home';
import ItemsPage from './pages/customer/ItemsPage';
import DiscountsPage from './pages/customer/DiscountsPage';
import ProfilePage from './pages/customer/ProfilePage';
import FruitsVeggiesPage from './pages/customer/FruitsVeggiesPage';
import SnacksPage from './pages/customer/SnacksPage';
import ColdDrinksPage from './pages/customer/ColdDrinksPage';
import DairyProductsPage from './pages/customer/DairyProductsPage';
import CartPage from './pages/customer/CartPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReports from './pages/admin/AdminReports';

// Auth route wrapper component
const ProtectedRoute = ({ children, requiredRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Check role if required
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

// App component with all routes
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
          
          {/* Customer Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="discounts" element={<DiscountsPage />} />
            <Route 
              path="profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="fruits-veggies" element={<FruitsVeggiesPage />} />
            <Route path="snacks" element={<SnacksPage />} />
            <Route path="cold-drinks" element={<ColdDrinksPage />} />
            <Route path="dairy-products" element={<DairyProductsPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
          
          {/* 404 - Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;