import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {registerUser, loginUser, checkToken} from '../../utils/api.js';

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
    loading: false,
};

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await registerUser(email, password);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await loginUser(email, password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkStatus',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) {
            return rejectWithValue('Token tidak tersedia');
        }
        try {
            const response = await checkToken(token);
            return response.data.user;
        } catch (error) {
            localStorage.removeItem('token');
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', () => {
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.loading = false;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.loading = false;
            })
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.user = null;
                state.token = null;
                state.loading = false;
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.loading = false;
            });
    },
});

export default authSlice.reducer;
