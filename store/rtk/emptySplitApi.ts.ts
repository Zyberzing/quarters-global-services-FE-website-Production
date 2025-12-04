import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_QUARTUS_API_URL,  // Global base URL from .env
  }),
  endpoints: () => ({}),  // Start empty
});
