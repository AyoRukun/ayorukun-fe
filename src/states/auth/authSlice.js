import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkToken, loginUser, registerUser } from '../../utils/api';
import { startLoading, stopLoading } from '../loading/loadingSlice.js';
import { toastError, toastSuccess } from '../../utils/toast.js';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await registerUser(email, password);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());

    try {
      const response = await loginUser(email, password);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const checkAuth = createAsyncThunk(
  'auth/checkStatus',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());

    try {
      const response = await checkToken();
      return response.data.user;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('token');
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        toastSuccess('Daftar berhasil!');
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toastError('Daftar gagal!');
      })
    // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
        toastSuccess('Login berhasil!');
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toastError('Login gagal!');
      })
    // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
    // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        toastSuccess('Logout berhasil!');
      });
  },
});

export default authSlice.reducer;
