import { createSlice } from "@reduxjs/toolkit";

// Get user from local storage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  movies: [],
  tag: ''
};

// export const addTag = createAsyncThunk(
//   "movies/addTag",
//   async (commentData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await commentService.createComment(commentData, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const addTag = async(selectedTag) =>{
//   return selectedTag;
// }

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reset: (state) => {
      state.movies = [];
      state.tag = '';
    },
    addTag:(state) =>{
      state.tag = 'upcoming'
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //       .addCase(addTag.fulfilled, (state, action) => {
  //           state.isLoading = false;
  //           state.isSuccess = true;
  //           state.movies.push(action.payload);
  //           state.tag.push(action.payload.selectedTag)
  //       })
  //       .addCase(createComment.rejected, (state, action) => {
  //         state.movies = [];
  //         state.tag = '';
  //       })
  // }
});

export const { reset, addTag } = movieSlice.actions;
export default movieSlice.reducer;
