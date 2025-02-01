import type { UserMe } from '@/interfaces/auth.interfaces';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Setting a state for Strapi response
// export type AuthUserStateWithoutJwt = Omit<AuthUserState, 'jwt'>;

export interface AuthUserState {
  token: string | null;
  user: UserMe;
}

// Define auth shape

interface AuthState {
  loading: boolean;
  session: AuthUserState | null;
  error: string | null;
  success: boolean;
}

// Initial state
const initialState: AuthState = {
  loading: true,
  session: null,
  error: null,
  success: false,
};

// Create auth slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login is in progress
    // authRequest: (state) => {
    //   state.error = null;
    //   state.success = false;
    // },
    // No user is logged in
    authClear: (state) => {
      state.loading = false;
      state.session = null;
      state.error = null;
      state.success = false;
    },
    // Login is successful
    authSuccess: (state, action: PayloadAction<AuthUserState>) => {
      state.session = {
        ...state.session, // Mantén las propiedades existentes
        ...action.payload, // Actualiza las nuevas propiedades
      };
      state.error = null;
      state.success = true;
      state.loading = false;
    },

    // When there's an error in authentication
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    // Logout user
    logout: (state) => {
      state.loading = false;
      state.session = null;
      state.error = null;
      state.success = false;
    },
  },
});

// Export actions
export const { authFailure, authSuccess, logout, authClear } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
