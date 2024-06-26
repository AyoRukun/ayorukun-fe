import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
import { startLoading, stopLoading } from '../loading/loadingSlice.js';
import { toastError, toastSuccess } from '../../utils/toast.js';

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
    dispatch(startLoading());
    try {
      const response = await getDiscussionList();
      return response.data.discussions;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const fetchDiscussionDetail = createAsyncThunk(
  'discussions/fetchDiscussionDetail',
  async ({ discussionId }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await getDiscussionDetail(discussionId);
      return response.data.report;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const addDiscussion = createAsyncThunk(
  'discussions/addDiscussion',
  async (discussionData, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await createDiscussion(discussionData);
      dispatch(fetchDiscussions());
      return response.data.discussion;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const addDiscussionComment = createAsyncThunk(
  'discussions/addDiscussionComment',
  async ({ discussionId, commentData }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await createDiscussionComment(discussionId, commentData);
      return { discussionId, comment: response.data.comment };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const likeDiscussionById = createAsyncThunk(
  'discussions/likeDiscussionById',
  async (discussionId, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await likeDiscussion(discussionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const unlikeDiscussionById = createAsyncThunk(
  'discussions/unlikeDiscussionById',
  async (discussionId, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await unlikeDiscussion(discussionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const likeDiscussionCommentById = createAsyncThunk(
  'discussions/likeCommentById',
  async ({ discussionId, commentId, userId }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await likeDiscussionComment(discussionId, commentId, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const unlikeDiscussionCommentById = createAsyncThunk(
  'discussions/unlikeCommentById',
  async ({ discussionId, commentId }, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await unlikeDiscussionComment(discussionId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());
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
      .addCase(addDiscussion.fulfilled, (state) => {
        state.isLoading = false;
        toastSuccess('Diskusi berhasil ditambahkan!');
      })
      .addCase(addDiscussion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toastError('Diskusi gagal ditambahkan!');
      })

    // Add Discussion Comment
      .addCase(addDiscussionComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDiscussionComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const { comment } = action.payload;
        state.discussion.comments.push(comment);
        toastSuccess('Komentar berhasil ditambahkan!');
      })
      .addCase(addDiscussionComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toastError('Komentar gagal ditambahkan!');
      })

    // Like Discussion
      .addCase(likeDiscussionById.fulfilled, (state, action) => {
        const { discussion_id, user_id } = action.payload.vote;
        state.discussions = state.discussions.map((discussion) => (discussion.id === discussion_id
          ? { ...discussion, likedBy: [...discussion.likedBy, user_id] }
          : discussion));
      })

    // Unlike Discussion
      .addCase(unlikeDiscussionById.fulfilled, (state, action) => {
        const { discussion_id, user_id } = action.payload.vote;
        state.discussions = state.discussions.map((discussion) => (discussion.id === discussion_id
          ? { ...discussion, likedBy: discussion.likedBy.filter((likedId) => likedId !== user_id) }
          : discussion));
      })

    // Like Comment
      .addCase(likeDiscussionCommentById.fulfilled, (state, action) => {
        const { comment_id, user_id } = action.payload.vote;
        state.discussion.comments = state.discussion.comments.map((comment) => (comment.id === comment_id
          ? { ...comment, likedBy: [...comment.likedBy, user_id] }
          : comment));
      })

    // Unlike Comment
      .addCase(unlikeDiscussionCommentById.fulfilled, (state, action) => {
        const { comment_id, user_id } = action.payload.vote;
        state.discussion.comments = state.discussion.comments.map((comment) => (comment.id === comment_id
          ? { ...comment, likedBy: comment.likedBy.filter((likedId) => likedId !== user_id) }
          : comment));
      });
  },
});

export default discussionSlice.reducer;
