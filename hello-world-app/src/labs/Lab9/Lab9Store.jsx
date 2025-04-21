// src/app/Lab9Store.js
import { configureStore } from '@reduxjs/toolkit';
import { Lab9Api } from './Lab9Api';

const Lab9Store = configureStore({
  reducer: {
    [Lab9Api.reducerPath]: Lab9Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Lab9Api.middleware),
});

export default Lab9Store;
