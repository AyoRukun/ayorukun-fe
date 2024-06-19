import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createReport,
  createReportComment,
  getReportDetail,
  getReportList,
  likeReport,
  likeReportComment,
  unlikeReport,
  unlikeReportComment,
} from '../../utils/api.js';
import { startLoading, stopLoading } from '../loading/loadingSlice.js';
import { toastError, toastSuccess } from '../../utils/toast.js';

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
    dispatch(startLoading());
    try {
      const response = await getReportList();
      return response.data.reports;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const fetchReportDetail = createAsyncThunk(
  'reports/fetchReportDetail',
  async (reportId, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await getReportDetail(reportId);
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const addReport = createAsyncThunk(
  'reports/addReport',
  async (reportData, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await createReport(reportData);
      dispatch(fetchReports());
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const addReportComment = createAsyncThunk(
  'reports/addReportComment',
  async ({ reportId, commentData }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await createReportComment(reportId, commentData);
      return { reportId, comment: response.data.comment };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const likeReportById = createAsyncThunk(
  'reports/likeReportById',
  async (reportId, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await likeReport(reportId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const unlikeReportById = createAsyncThunk(
  'reports/unlikeReportById',
  async (reportId, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await unlikeReport(reportId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const likeReportCommentById = createAsyncThunk(
  'reports/likeReportCommentById',
  async ({ reportId, commentId }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await likeReportComment(reportId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const unlikeReportCommentById = createAsyncThunk(
  'reports/unlikeReportCommentById',
  async ({ reportId, commentId }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await unlikeReportComment(reportId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch Reports
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
      .addCase(addReport.fulfilled, (state) => {
        state.isLoading = false;
        toastSuccess('Laporan berhasil ditambahkan!');
      })
      .addCase(addReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toastError('Laporan gagal ditambahkan!');
      })

    // Add Report Comment
      .addCase(addReportComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReportComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { comment } = action.payload;
        state.report.comments.push(comment);
        toastSuccess('Komentar berhasil ditambahkan!');
      })
      .addCase(addReportComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toastError('Komentar gagal ditambahkan!');
      })

    // Like Report
      .addCase(likeReportById.fulfilled, (state, action) => {
        const { report_id, user_id } = action.payload.vote;
        state.reports = state.reports.map((report) => (report.id === report_id
          ? { ...report, likedBy: [...report.likedBy, user_id] }
          : report));
      })

    // Unlike Report
      .addCase(unlikeReportById.fulfilled, (state, action) => {
        const { report_id, user_id } = action.payload.vote;
        state.reports = state.reports.map((report) => (report.id === report_id
          ? { ...report, likedBy: report.likedBy.filter((id) => id !== user_id) }
          : report));
      })

    // Like Report Comment
      .addCase(likeReportCommentById.fulfilled, (state, action) => {
        const { comment_id, user_id } = action.payload.vote;
        state.report.comments = state.report.comments.map((comment) => (comment.id === comment_id
          ? { ...comment, likedBy: [...comment.likedBy, user_id] }
          : comment));
      })

    // Unlike Report Comment
      .addCase(unlikeReportCommentById.fulfilled, (state, action) => {
        const { comment_id, user_id } = action.payload.vote;
        state.report.comments = state.report.comments.map((comment) => (comment.id === comment_id
          ? { ...comment, likedBy: comment.likedBy.filter((id) => id !== user_id) }
          : comment));
      });
  },
});

export default reportSlice.reducer;
