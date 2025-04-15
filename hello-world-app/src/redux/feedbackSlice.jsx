// src/redux/feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fakeApi = {
  getFeedbacks: async () => {
    return JSON.parse(localStorage.getItem('feedbacks')) || [];
  },
  postFeedback: async (feedback) => {
    const list = JSON.parse(localStorage.getItem('feedbacks')) || [];
    list.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(list));
    return feedback;
  },
  deleteFeedback: async (index) => {
    const list = JSON.parse(localStorage.getItem('feedbacks')) || [];
    list.splice(index, 1);
    localStorage.setItem('feedbacks', JSON.stringify(list));
    return index;
  },
  updateFeedback: async (updatedFeedback) => {
    const list = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const index = list.findIndex((feedback) => feedback.id === updatedFeedback.id);
    if (index !== -1) {
      list[index] = updatedFeedback;
      localStorage.setItem('feedbacks', JSON.stringify(list));
    }
    return updatedFeedback;
  }
};

export const fetchFeedbacks = createAsyncThunk('feedback/fetch', async () => {
  return await fakeApi.getFeedbacks();
});

export const addFeedback = createAsyncThunk('feedback/add', async (feedback) => {
  return await fakeApi.postFeedback(feedback);
});

export const deleteFeedback = createAsyncThunk('feedback/delete', async (index) => {
  return await fakeApi.deleteFeedback(index);
});

export const updateFeedback = createAsyncThunk('feedback/update', async (updatedFeedback) => {
  return await fakeApi.updateFeedback(updatedFeedback);
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
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback.id !== action.payload
        );
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex(
          (feedback) => feedback.id === action.payload.id
        );
        if (index !== -1) {
          state.feedbacks[index] = action.payload;
        }
      });
  },
});

export default feedbackSlice.reducer;
