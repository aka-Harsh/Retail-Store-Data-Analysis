// src/components/cart/CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🛒</div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded mr-4">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 py-1 border-r border-gray-300"
          >
            -
          </button>
          <span className="px-3 py-1">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 py-1 border-l border-gray-300"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;
