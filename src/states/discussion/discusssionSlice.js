import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  createDiscussion,
  createDiscussionComment,
  getDiscussionDetail,
  getDiscussionList,
  likeDiscussion,
  likeDiscussionComment,
  unlikeDiscussion,
  unlikeDiscussionComment,
} from '../../utils/api';

const initialState = {
  discussions: [],
  discussion: null,
  comments: {},
  isLoading: false,
  error: null,
};

export const fetchDiscussions = createAsyncThunk(
  'discussions/fetchDiscussions',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await getDiscussionList();
      return response.data.discussions;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const fetchDiscussionDetail = createAsyncThunk(
  'discussions/fetchDiscussionDetail',
  async (discussionId, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await getDiscussionDetail(discussionId);
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const addDiscussion = createAsyncThunk(
  'discussions/addDiscussion',
  async (discussionData, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await createDiscussion(discussionData);
      return response.data.discussion;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const addDiscussionComment = createAsyncThunk(
  'discussions/addDiscussionComment',
  async ({ discussionId, commentData }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await createDiscussionComment(discussionId, commentData);
      return { discussionId, comment: response.data.comment };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  },
);

export const likeDiscussionById = createAsyncThunk(
  'discussions/likeDiscussionById',
  async (discussionId, { rejectWithValue }) => {
    try {
      const response = await likeDiscussion(discussionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const unlikeDiscussionById = createAsyncThunk(
  'discussions/unlikeDiscussionById',
  async (discussionId, { rejectWithValue }) => {
    try {
      const response = await unlikeDiscussion(discussionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const likeCommentById = createAsyncThunk(
  'discussions/likeCommentById',
  async ({ discussionId, commentId, userId }, { rejectWithValue }) => {
    try {
      const response = await likeDiscussionComment(discussionId, commentId, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const unlikeCommentById = createAsyncThunk(
  'discussions/unlikeCommentById',
  async ({ discussionId, commentId }, { rejectWithValue }) => {
    try {
      const response = await unlikeDiscussionComment(discussionId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const discussionSlice = createSlice({
  name: 'discussions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch Discussions
      .addCase(fetchDiscussions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discussions = action.payload;
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // Fetch Discussion Detail
      .addCase(fetchDiscussionDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDiscussionDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discussion = action.payload;
      })
      .addCase(fetchDiscussionDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // Add Discussion
      .addCase(addDiscussion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // Add Discussion Comment
      .addCase(addDiscussionComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDiscussionComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { discussionId, comment } = action.payload;
        state.comments[discussionId] = state.comments[discussionId] || [];
        state.comments[discussionId].push(comment);
      })
      .addCase(addDiscussionComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

    // Like Discussion
      .addCase(likeDiscussionById.fulfilled, (state, action) => {
        state.discussions = state.discussions.map((discussion) => (discussion.id === action.payload.id
          ? { ...discussion, likedBy: [...discussion.likedBy, action.payload.userId] } // Add userId to likedBy
          : discussion));
      })

    // Unlike Discussion
      .addCase(unlikeDiscussionById.fulfilled, (state, action) => {
        state.discussions = state.discussions.map((discussion) => (discussion.id === action.payload.id
          ? { ...discussion, likedBy: discussion.likedBy.filter((id) => id !== action.payload.userId) } // Remove userId
          : discussion));
      })

    // Like Comment
      .addCase(likeCommentById.fulfilled, (state, action) => {
        state.comments[action.payload.discussionId] = state.comments[action.payload.discussionId].map((comment) => (comment.id === action.payload.id
          ? { ...comment, likedBy: [...comment.likedBy, action.payload.userId] }
          : comment));
      })

    // Unlike Comment
      .addCase(unlikeCommentById.fulfilled, (state, action) => {
        state.comments[action.payload.discussionId] = state.comments[action.payload.discussionId].map((comment) => (comment.id === action.payload.id
          ? { ...comment, likedBy: comment.likedBy.filter((id) => id !== action.payload.userId) }
          : comment));
      });
  },
});

export default discussionSlice.reducer;
