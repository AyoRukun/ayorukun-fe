import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/auth/authSlice';
import discussionReducer from "../states/discussion/discusssionSlice";
import regionReducer from "../states/region/regionSlice.js";
import reportReducer from "../states/report/reportSlice.js";
import {loadingBarReducer} from "react-redux-loading-bar";

const store = configureStore({
    reducer: {
        auth: authReducer,
        discussion: discussionReducer,
        region: regionReducer,
        report: reportReducer,
        loadingBar: loadingBarReducer,
    },
});

export default store;
