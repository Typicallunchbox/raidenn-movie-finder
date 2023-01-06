import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "../comments/commentService";

// Get user from local storage
let user = null

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create Comment
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.createComment(commentData, token);
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

//Delete Comment
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(id, token);
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

//Get Comments By Id
export const getCommentsByMovieId = createAsyncThunk(
  "comments/getCommentsByMovieId",
  async (id, thunkAPI) => {
    try {
      user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
        return await commentService.getCommentsByMovieId(id, token);
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

//Get Comments
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (thunkAPI) => {
    try {
      user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
        return await commentService.getComments(token);
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

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(createComment.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.comments.push(action.payload)
        })
        .addCase(createComment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })

        .addCase(getCommentsByMovieId.pending, (state) => {
            state.isLoading = false;
        })
        .addCase(getCommentsByMovieId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.comments = action.payload
        })
        .addCase(getCommentsByMovieId.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })

      .addCase(getComments.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.comments = action.payload
      })
      .addCase(getComments.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
      })

        .addCase(deleteComment.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.comments = state.comments.filter((comment) => comment._id !== action.payload.id)
      })
      .addCase(deleteComment.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
      })
  },
});

export const { reset } = commentsSlice.actions;
export default commentsSlice.reducer;
