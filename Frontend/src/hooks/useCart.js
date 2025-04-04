import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../store/slices/cartSlice';

/**
 * Custom hook for cart operations
 */
export const useCart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addItem = (product, quantity = 1) => {
    dispatch(addToCart({
      ...product,
      quantity
    }));
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const updateItem = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = () => {
    return total;
  };

  return {
    items,
    total,
    addItem,
    removeItem,
    updateItem,
    emptyCart,
    getItemCount,
    getCartTotal
  };
};