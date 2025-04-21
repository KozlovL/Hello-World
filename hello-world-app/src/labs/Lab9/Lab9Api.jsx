// src/lab9/Lab9Api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Lab9Api = createApi({
  reducerPath: 'Lab9Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: () => 'feedbacks',
    }),
  }),
});

export const { useGetFeedbackQuery } = Lab9Api;
