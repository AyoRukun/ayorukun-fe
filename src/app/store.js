import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;