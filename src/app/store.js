import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../states/auth/authSlice';
import discussionReducer from '../states/discussion/discusssionSlice';
import regionReducer from '../states/region/regionSlice';
import reportReducer from '../states/report/reportSlice';
import loadingReducer from '../states/loading/loadingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    discussion: discussionReducer,
    region: regionReducer,
    report: reportReducer,
    loading: loadingReducer,
  },
});

export default store;
