import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Harsh Mehta',
  age: 10,
  gender: 'Male',
  phone: '+91 1234567890',
  isLoggedIn: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { updateUserProfile, logout, login } = userSlice.actions;

export default userSlice.reducer;