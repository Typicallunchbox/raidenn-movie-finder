import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import watchlistService from "../watchlists/watchlistService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  watchlist: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create watchlist record
export const createWatchlistRecord = createAsyncThunk(
  "watchlist",
  async (watchListData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchlistService.createWatchlistRecord(watchListData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update watchlist record
export const updateWatchlistRecord = createAsyncThunk(
  "watchlist",
  async (watchlistData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchlistService.updateWatchlistRecord(watchlistData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete watchlist record
export const deleteWatchlistRecord = createAsyncThunk(
  "watchlist",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await watchlistService.deleteWatchlistRecord(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get watchlist by user id
export const getWatchlistByUserId = createAsyncThunk(
  "watchlist",
  async (thunkAPI) => {
    try {
      const token = user.token;
        return await watchlistService.getWatchlistByUserId(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get watched
export const getWatched = createAsyncThunk(
  "watchlist/watched",
  async (thunkAPI) => {
    try {
      const token = user.token;
        return await watchlistService.getWatched(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get want to watch
export const getWantToWatch = createAsyncThunk(
  "watchlist/wantToWatch",
  async (thunkAPI) => {
    try {
      const token = user.token;
        return await watchlistService.getWantToWant(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.watchlist = [],
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
        // CREATE
        .addCase(createWatchlistRecord.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createWatchlistRecord.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.watchlist.push(action.payload)
        })
        .addCase(createWatchlistRecord.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })

         // GET ALL
        .addCase(getWatchlistByUserId.pending, (state) => {
            state.isLoading = false;
        })
        .addCase(getWatchlistByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.watchlist = action.payload
        })
        .addCase(getWatchlistByUserId.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })

       // GET WATCHED
      .addCase(getWatched.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getWatched.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.watchlist = action.payload
      })
      .addCase(getWatched.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
      })

      // GET WANT TO WATCH
      .addCase(getWantToWatch.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getWantToWatch.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.watchlist = action.payload
      })
      .addCase(getWantToWatch.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
      })

      // DELETE
      .addCase(deleteWatchlistRecord.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(deleteWatchlistRecord.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.watchlist = state.watchlist.filter((watchlist) => watchlist._id !== action.payload.id)
      })
      .addCase(deleteWatchlistRecord.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
      })
  },
});

export const { reset } = watchlistSlice.actions;
export default watchlistSlice.reducer;
