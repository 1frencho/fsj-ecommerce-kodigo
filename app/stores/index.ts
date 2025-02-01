import { configureStore } from '@reduxjs/toolkit';

// Import the auth slice
import authReducer from './auth.slice';
// Initialize the store

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Setting the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
