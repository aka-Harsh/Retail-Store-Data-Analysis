// src/components/index.js

// Admin components
export { default as AdminLayout } from './admin/AdminLayout';
export { default as Dashboard } from './admin/Dashboard';
export { default as ProductManagement } from './admin/ProductManagement';
export { default as ProductForm } from './admin/ProductForm';
export { default as OrderManagement } from './admin/OrderManagement';
export { default as SalesReport } from './admin/SalesReport';

// Auth components
export { default as LoginForm } from './auth/LoginForm';
export { default as RegisterForm } from './auth/RegisterForm';
export { default as AuthGuard } from './auth/AuthGuard';

// Cart components
export { default as CartItem } from './cart/CartItem';
export { default as CheckoutForm } from './cart/CheckoutForm';

// Common components
export { default as Layout } from './common/Layout';
export { default as Navbar } from './common/Navbar';
export { default as Footer } from './common/Footer';
export { default as Loader } from './common/Loader';
export { default as ErrorBoundary } from './common/ErrorBoundary';
export { default as Pagination } from './common/Pagination';

// Product components
export { default as ProductCard } from './products/ProductCard';
export { default as ProductDetailModal } from './products/ProductDetailModal';
export { default as ProductScroller } from './products/ProductScroller';

// Profile components
export { default as ProfileModal } from './profile/ProfileModal';
export { default as OrderHistory } from './profile/OrderHistory';