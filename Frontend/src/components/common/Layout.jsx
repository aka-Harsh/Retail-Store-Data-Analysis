// src/components/common/Layout.jsx
import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import ProfileModal from '../profile/ProfileModal';
import authService from '../../services/auth.service';

const Layout = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const user = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Check if user is admin
  const isAdmin = authService.isAdmin();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Side Navigation */}
      <div className="fixed left-0 top-0 bottom-0 w-60 border-r border-gray-200 bg-white z-10">
        <div className="flex flex-col h-full py-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center p-4 mx-4 my-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-100 hover:bg-gray-200'}`
            }
          >
            <span className="text-lg font-semibold">Menu</span>
            <span className="ml-auto text-2xl">≡</span>
          </NavLink>
          
          <NavLink 
            to="/items" 
            className={({ isActive }) => 
              `flex items-center p-4 mx-4 my-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-100 hover:bg-gray-200'}`
            }
          >
            <span className="text-lg font-semibold">Items</span>
            <span className="ml-auto text-xl">🏷️</span>
          </NavLink>
          
          <NavLink 
            to="/discounts" 
            className={({ isActive }) => 
              `flex items-center p-4 mx-4 my-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-100 hover:bg-gray-200'}`
            }
          >
            <span className="text-lg font-semibold">Discounts</span>
            <span className="ml-auto text-xl">🏷️</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center p-4 mx-4 my-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-100 hover:bg-gray-200'}`
            }
          >
            <span className="text-lg font-semibold">You</span>
            <span className="ml-auto text-xl">👤</span>
          </NavLink>
          
          {isAdmin && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => 
                `flex items-center p-4 mx-4 my-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-100 hover:bg-gray-200'}`
              }
            >
              <span className="text-lg font-semibold">Admin</span>
              <span className="ml-auto text-xl">⚙️</span>
            </NavLink>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-60">
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setShowProfileModal(true)}
              className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl"
            >
              👤
            </button>
          </div>
          
          <div className="text-4xl font-bold">
            <span className="text-green-400">Blink</span>
            <span className="text-yellow-300">It</span>
          </div>
          
          <div className="flex space-x-4">
            <NavLink 
              to="/cart"
              className="bg-green-400 px-6 py-3 rounded-full flex items-center font-bold hover:bg-green-500 relative"
            >
              <span>My Cart</span>
              <span className="ml-2">🛒</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </NavLink>
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="bg-green-400 px-6 py-3 rounded-full font-bold hover:bg-green-500"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-green-400 px-6 py-3 rounded-full font-bold hover:bg-green-500"
              >
                Login
              </Link>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <main>
          <Outlet />
        </main>
      </div>
      
      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal 
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default Layout;