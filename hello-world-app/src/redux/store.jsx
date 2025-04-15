// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import feedbackReducer from './feedbackSlice';
import counterReducer from './reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    feedback: feedbackReducer,
  },
});

export default store;