// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  username: localStorage.getItem('username') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { username } = action.payload;
      state.isLoggedIn = true;
      state.username = username;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.username = '';
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('username');
    },
    updateUsername(state, action) {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
  },
});

export const { login, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
