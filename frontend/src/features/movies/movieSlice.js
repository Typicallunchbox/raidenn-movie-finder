import { createSlice } from "@reduxjs/toolkit";

// Get user from local storage
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  movies: [],
  tag: ''
};


export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    reset: (state) => {
      state.movies = [];
      state.tag = '';
    },
    addTag:(state, action) =>{
      state.tag = action.payload;
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
