// src/pages/customer/CartPage.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { placeOrder } from '../../store/slices/orderSlice';
import orderService from '../../services/order.service';
import authService from '../../services/auth.service';

const CartPage = () => {
  const { items, total } = useSelector(state => state.cart);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: user?.username || '',
    customerEmail: user?.email || '',
    shippingAddress: '',
    phoneNumber: ''
  });
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleCheckout = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    if (items.length === 0) {
      alert('Your cart is empty. Add some items before checkout.');
      return;
    }
    
    // Show checkout form
    setShowCheckoutForm(true);
  };
  
  const handleCheckoutDataChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData({
      ...checkoutData,
      [name]: value
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Your cart is empty. Add some items before checkout.');
      return;
    }
    
    // Validate form
    if (!checkoutData.customerName.trim() || 
        !checkoutData.customerEmail.trim() || 
        !checkoutData.shippingAddress.trim() || 
        !checkoutData.phoneNumber.trim()) {
      setError('Please fill out all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create order object - Make sure we're only sending what the API expects
      const orderData = {
        customerName: checkoutData.customerName,
        customerEmail: checkoutData.customerEmail,
        shippingAddress: checkoutData.shippingAddress,
        phoneNumber: checkoutData.phoneNumber,
        items: items.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      };
      
      // Submit order to API
      const createdOrder = await orderService.createOrder(orderData);
      
      // Store order in Redux
      dispatch(placeOrder({ 
        items, 
        total,
        id: createdOrder.id,
        date: createdOrder.orderDate,
        status: createdOrder.status
      }));
      
      // Clear the cart
      dispatch(clearCart());
      
      // Show confirmation and navigate to profile
      alert('Your order has been placed successfully!');
      navigate('/profile');
      
    } catch (err) {
      console.error('Failed to place order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
//   const handleSubmitOrder = async (e) => {
//     e.preventDefault();
    
//     if (items.length === 0) {
//       alert('Your cart is empty. Add some items before checkout.');
//       return;
//     }
    
//     // Validate form
//     if (!checkoutData.customerName.trim() || 
//         !checkoutData.customerEmail.trim() || 
//         !checkoutData.shippingAddress.trim() || 
//         !checkoutData.phoneNumber.trim()) {
//       setError('Please fill out all fields');
//       return;
//     }
    
//     try {
//       setIsSubmitting(true);
//       setError(null);
      
//       // Create order object
//       const orderData = {
//         ...checkoutData,
//         items: items.map(item => ({
//           productId: item.id,
//           quantity: item.quantity
//         }))
//       };
      
//       // Submit order to API
//       const createdOrder = await orderService.createOrder(orderData);
      
//       // Store order in Redux
//       dispatch(placeOrder({ 
//         items, 
//         total,
//         id: createdOrder.id,
//         date: createdOrder.orderDate,
//         status: createdOrder.status
//       }));
      
//       // Clear the cart
//       dispatch(clearCart());
      
//       // Show confirmation and navigate to profile
//       alert('Your order has been placed successfully!');
//       navigate('/profile');
      
//     } catch (err) {
//       console.error('Failed to place order:', err);
//       setError('Failed to place order. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-2xl text-gray-500 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-green-400 rounded-md font-bold hover:bg-green-500"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items - Takes up 2/3 of space on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mr-4 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-3xl">🛒</div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 border-r"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 border-l"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Checkout Section - Takes up 1/3 of space on large screens */}
          <div className="lg:col-span-1">
            {showCheckoutForm ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Checkout</h2>
                
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-3">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={checkoutData.customerName}
                      onChange={handleCheckoutDataChange}
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
                      value={checkoutData.customerEmail}
                      onChange={handleCheckoutDataChange}
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
                      value={checkoutData.phoneNumber}
                      onChange={handleCheckoutDataChange}
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
                      value={checkoutData.shippingAddress}
                      onChange={handleCheckoutDataChange}
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
                      onClick={() => setShowCheckoutForm(false)}
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
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Clear Cart
                  </button>
                  
                  <button
                    onClick={handleCheckout}
                    className="px-6 py-2 bg-green-400 rounded-md font-bold hover:bg-green-500"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;