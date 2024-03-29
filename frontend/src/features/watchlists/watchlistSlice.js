import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import watchlistService from "./watchlistService";

// Get user from local storage
let user = null;

const initialState = {
  watched: [],
  wantToWatch: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create watchlist record
export const createWatchlistRecord = createAsyncThunk(
  "watchlist/create",
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
  "watchlist/update",
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
  "watchlist/delete",
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
  "watchlist/getWatchlist",
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
      user = JSON.parse(localStorage.getItem("user"));
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
      user = JSON.parse(localStorage.getItem("user"));

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

//Get want to watch record
export const getWantToWatchRecord = async (watchlistData) => {
    try {
        user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        return await watchlistService.getWantToWatchRecord(watchlistData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  };

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.watched = [];
      state.wantToWatch = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    banishWatched: (state, action) => ({
      ...state,
      watched: state.watched.filter(item => item._id !== action.payload._id),
    }),
    banishWantToWatch: (state, action) => ({
      ...state,
      wantToWatch: state.wantToWatch.filter(item => item._id !== action.payload._id),
    })
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
          state.watched = action.payload
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
          state.wantToWatch = action.payload
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

export const { reset, banishWatched, banishWantToWatch, getWatchedRecords, getWantToWatchRecords } = watchlistSlice.actions;
export default watchlistSlice.reducer;
