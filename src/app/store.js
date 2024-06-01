import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/auth/authSlice';
import discussionReducer from "../states/discussion/discusssionSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        discussion: discussionReducer,
    },
});

export default store;
