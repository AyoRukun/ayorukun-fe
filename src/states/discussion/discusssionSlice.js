import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getDiscussionList,
    createDiscussion,
    getDiscussionDetail,
    createDiscussionComment
} from '../../utils/api.js';

const initialState = {
    discussions: [],
    discussion: null,
    comments: {},
    isLoading: false,
    error: null,
};

export const fetchDiscussions = createAsyncThunk(
    'discussions/fetchDiscussions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getDiscussionList();
            return response.data.discussions;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDiscussionDetail = createAsyncThunk(
    'discussions/fetchDiscussionDetail',
    async (discussionId, { rejectWithValue }) => {
        try {
            const response = await getDiscussionDetail(discussionId);
            return response.data.report;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addDiscussion = createAsyncThunk(
    'discussions/addDiscussion',
    async (discussionData, { rejectWithValue }) => {
        try {
            const response = await createDiscussion(discussionData);
            return response.data.discussion;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addDiscussionComment = createAsyncThunk(
    'discussions/addDiscussionComment',
    async ({ discussionId, commentData }, { rejectWithValue }) => {
        try {
            const response = await createDiscussionComment(discussionId, commentData);
            return { discussionId, comment: response.data.comment };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const discussionSlice = createSlice({
    name: 'discussions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Discussions
            .addCase(fetchDiscussions.pending, (state) => { state.isLoading = true; })
            .addCase(fetchDiscussions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.discussions = action.payload;
            })
            .addCase(fetchDiscussions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Discussion Detail
            .addCase(fetchDiscussionDetail.pending, (state) => { state.isLoading = true; })
            .addCase(fetchDiscussionDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.discussion = action.payload;
            })
            .addCase(fetchDiscussionDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add Discussion
            .addCase(addDiscussion.pending, (state) => { state.isLoading = true; })
            .addCase(addDiscussion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.discussions.push(action.payload);
            })
            .addCase(addDiscussion.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add Discussion Comment
            .addCase(addDiscussionComment.pending, (state) => { state.isLoading = true; })
            .addCase(addDiscussionComment.fulfilled, (state, action) => {
                state.isLoading = false;
                const { discussionId, comment } = action.payload;
                state.comments[discussionId] = state.comments[discussionId] || [];
                state.comments[discussionId].push(comment);
            })
            .addCase(addDiscussionComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default discussionSlice.reducer;
