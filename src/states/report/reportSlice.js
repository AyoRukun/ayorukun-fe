import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createReport,
    createReportComment,
    getReportList,
    getReportDetail,
} from '../../utils/api.js';
import {hideLoading, showLoading} from "react-redux-loading-bar";

const initialState = {
    reports: [],
    report: null,
    comments: {},
    isLoading: false,
    error: null,
};

export const fetchReports = createAsyncThunk(
    'reports/fetchReports',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await getReportList();
            return response.data.reports;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

export const fetchReportDetail = createAsyncThunk(
    'reports/fetchReportDetail',
    async (reportId, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await getReportDetail(reportId);
            return response.data.report;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

export const addReport = createAsyncThunk(
    'reports/addReport',
    async (reportData, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await createReport(reportData);
            return response.data.report;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

export const addReportComment = createAsyncThunk(
    'reports/addReportComment',
    async ({ reportId, commentData }, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await createReportComment(reportId, commentData);
            return { reportId, comment: response.data.comment };
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reports = action.payload;
            })
            .addCase(fetchReports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchReportDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReportDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.report = action.payload;
            })
            .addCase(fetchReportDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addReport.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReport.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addReportComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReportComment.fulfilled, (state, action) => {
                state.isLoading = false;
                const { reportId, comment } = action.payload;
                state.comments[reportId] = state.comments[reportId] || [];
                state.comments[reportId].push(comment);
            })
            .addCase(addReportComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default reportSlice.reducer;
