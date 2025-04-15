// src/redux/feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'http://localhost:3000/feedbacks';  // Здесь мы используем реальный API

export const fetchFeedbacks = createAsyncThunk('feedback/fetch', async () => {
  const response = await fetch(apiUrl);
  return await response.json();
});

export const addFeedback = createAsyncThunk('feedback/add', async (feedback) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  return await response.json();
});

export const updateFeedback = createAsyncThunk('feedback/update', async ({ id, feedback }) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  return await response.json();
});

export const deleteFeedback = createAsyncThunk('feedback/delete', async (id) => {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  return id; // возвращаем id для удаления из состояния
});

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
        state.loading = false;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter((f) => f.id !== action.payload);
      });
  },
});

export default feedbackSlice.reducer;
