// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

/**
 * Custom hook for handling authentication
 */
export const useAuth = () => {
  const { isLoggedIn, user, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if user is authenticated when component mounts
  useEffect(() => {
    const checkAuth = () => {
      return authService.isAuthenticated();
    };
    
    const isAuth = checkAuth();
    // If token exists but state doesn't reflect authenticated status,
    // you might need to restore user from localStorage or refresh token
  }, []);

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user || !user.roles) {
      return false;
    }
    return user.roles.includes(role);
  };

  // Check if user is admin
  const isAdmin = () => {
    return hasRole('ROLE_ADMIN');
  };

  // Redirect if not authenticated
  const requireAuth = (redirectTo = '/login') => {
    if (!isLoggedIn) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  // Redirect if not admin
  const requireAdmin = (redirectTo = '/') => {
    if (!isLoggedIn || !isAdmin()) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return {
    isLoggedIn,
    user,
    error,
    hasRole,
    isAdmin,
    requireAuth,
    requireAdmin
  };
};