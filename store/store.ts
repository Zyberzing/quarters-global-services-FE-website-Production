// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./rtk/emptySplitApi.ts";
import applicationReducer from "./slices/applicationSlice"
export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    application: applicationReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
});

// Types for convenience
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
