// src/components/auth/AuthGuard.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * AuthGuard component for protecting routes
 * @param {Object} props
 * @param {React.ReactElement} props.children - The protected component
 * @param {string[]} [props.requiredRoles] - Optional roles required to access the route
 * @returns {React.ReactElement}
 */
const AuthGuard = ({ children, requiredRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation();
  
  // Check if user is logged in
  if (!isLoggedIn) {
    // Redirect to login page and save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If specific roles are required, check if user has any of those roles
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = user.roles.some(role => requiredRoles.includes(role));
    
    if (!hasRequiredRole) {
      // User doesn't have the required role, redirect to home page
      return <Navigate to="/" replace />;
    }
  }
  
  // User is authenticated and has the required role (if any), render the protected component
  return children;
};

export default AuthGuard;