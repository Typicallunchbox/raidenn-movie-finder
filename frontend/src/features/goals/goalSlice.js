import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "../goals/goalService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create Goal
export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
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

//Delete Goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
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

//Get Goals
export const getGoals = createAsyncThunk(
  "goals/getGoals",
  async (thunkAPI) => {
    try {
      const token = user.token;
        return await goalService.getGoals(token);
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

export const goalsSlice = createSlice({
  name: "goals",
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
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })

        .addCase(getGoals.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })

        .addCase(deleteGoal.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
      })
      .addCase(deleteGoal.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload
      })
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
