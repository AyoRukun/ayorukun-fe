import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    createReport,
    createReportComment,
    getReportList,
    getReportDetail, unlikeReportComment, unlikeReport, likeReportComment, likeReport,
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

export const likeReportById = createAsyncThunk(
    'reports/likeReportById',
    async (reportId, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await likeReport(reportId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

export const unlikeReportById = createAsyncThunk(
    'reports/unlikeReportById',
    async (reportId, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await unlikeReport(reportId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

export const likeReportCommentById = createAsyncThunk(
    'reports/likeReportCommentById',
    async ({ reportId, commentId }, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await likeReportComment(reportId, commentId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        } finally {
            dispatch(hideLoading());
        }
    }
);

export const unlikeReportCommentById = createAsyncThunk(
    'reports/unlikeReportCommentById',
    async ({ reportId, commentId }, { dispatch, rejectWithValue }) => {
        dispatch(showLoading());
        try {
            const response = await unlikeReportComment(reportId, commentId);
            return response.data;
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
            // fetch Reports
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

            // Fetch Report Detail
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

            // Add Report
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

            // Add Report Comment
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
            })

            // Like Report
            .addCase(likeReportById.fulfilled, (state, action) => {
                const { reportId, userId } = action.payload.vote;
                state.reports = state.reports.map(report =>
                    report.id === reportId
                        ? { ...report, likedBy: [...report.likedBy, userId] }
                        : report
                );
            })

            // Unlike Report
            .addCase(unlikeReportById.fulfilled, (state, action) => {
                const { reportId, userId } = action.payload.vote;
                state.reports = state.reports.map(report =>
                    report.id === reportId
                        ? { ...report, likedBy: report.likedBy.filter(id => id !== userId) }
                        : report
                );
            })

            // Like Report Comment
            .addCase(likeReportCommentById.fulfilled, (state, action) => {
                const { reportId, commentId, userId } = action.payload.vote;
                state.comments[reportId] = state.comments[reportId]?.map(comment =>
                    comment.id === commentId
                        ? { ...comment, likedBy: [...comment.likedBy, userId] }
                        : comment
                );
            })

            // Unlike Report Comment
            .addCase(unlikeReportCommentById.fulfilled, (state, action) => {
                const { reportId, commentId, userId } = action.payload.vote;
                state.comments[reportId] = state.comments[reportId]?.map(comment =>
                    comment.id === commentId
                        ? { ...comment, likedBy: comment.likedBy.filter(id => id !== userId) }
                        : comment
                );
            });
    },
});

export default reportSlice.reducer;
