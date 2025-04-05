import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
      <div className="flex items-center">
        <Link to="/" className="text-4xl font-bold">
          <span className="text-green-400">Blink</span>
          <span className="text-yellow-300">It</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link 
          to="/cart"
          className="bg-green-400 px-6 py-2 rounded-full flex items-center font-bold hover:bg-green-500 relative"
        >
          <span>Cart</span>
          <span className="ml-2">🛒</span>
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {items.length}
            </span>
          )}
        </Link>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hi, {user?.username}</span>
            <button 
              onClick={handleLogout}
              className="bg-green-400 px-6 py-2 rounded-full font-bold hover:bg-green-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-400 px-6 py-2 rounded-full font-bold hover:bg-green-500"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
