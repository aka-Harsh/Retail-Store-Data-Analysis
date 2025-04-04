import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  nextOrderId: 1
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { items, total } = action.payload;
      
      const newOrder = {
        id: state.nextOrderId,
        items: [...items],
        total,
        date: new Date().toISOString(),
        status: 'Delivered'
      };
      
      state.orders.unshift(newOrder); // Add to beginning of array to show newest first
      state.nextOrderId += 1;
    }
  },
});

export const { placeOrder } = orderSlice.actions;

export default orderSlice.reducer;