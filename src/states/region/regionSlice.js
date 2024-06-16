import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchRegion } from '../../utils/api';
import {startLoading, stopLoading} from "../loading/loadingSlice.js";

const initialState = {
  regions: [],
  region: null,
  isLoading: false,
  error: null,
};

export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async (query, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const response = await searchRegion(query);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(stopLoading());

    }
  },
);

const regionSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    clearRegions: (state) => {
      state.regions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setRegion, clearRegions } = regionSlice.actions;
export default regionSlice.reducer;
