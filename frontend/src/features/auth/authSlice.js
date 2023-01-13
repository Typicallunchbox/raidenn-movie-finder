import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

//Login User
export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
      try {
        return await authService.login(user);
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

  //getMe info
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (user, thunkAPI) => {
    try {
      return await authService.getMe(user);
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

//Update Password
export const updatePassword = async (data) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      data.type = 'password';
      return await authService.updatePassword(data, user.token);
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

//Get User Security Questions 
export const getSecurityQuestions = async (data) => {
  try {
    data.type = 'email';
    return await authService.getSecurityQuestions(data);
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

//Get User Security Questions 
// export const setSecurityQuestions = async (data) => {
//   try {
//     let user = JSON.parse(localStorage.getItem("user"));
//     return await authService.setSecurityQuestions(data, user.token);
//   } catch (error) {
//     const message =
//       (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return message;
//   }
// };

//Register User
export const setSecurityQuestions = createAsyncThunk(
  "auth/setSecurityQuestions",
  async (data, thunkAPI) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      return await authService.setSecurityQuestions({securityQuestions : data}, user.token);
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

//Get User Security Questions 
export const compareSecurityAnswers = async (data) => {
  try {
    return await authService.compareSecurityAnswers(data);
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

export const authSlice = createSlice({
  name: "auth",
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
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })

        
        .addCase(setSecurityQuestions.pending, (state) => {
          state.isLoading = true
        })
        .addCase(setSecurityQuestions.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(setSecurityQuestions.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })


      //   .addCase(updatePassword.pending, (state) => {
      //     state.isLoading = true
      // })
      // .addCase(updatePassword.fulfilled, (state, action) => {
      //     state.isLoading = false
      //     state.isSuccess = true
      //     state.user = null
      // })
      // .addCase(updatePassword.rejected, (state, action) =>{
      //     state.isLoading = false
      //     state.isError = true
      //     state.message = action.payload
      // })



        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
  },
});

export const logout = createAsyncThunk("auth/logout",
async() => {
    await authService.logout()
})
export const { reset } = authSlice.actions;
export default authSlice.reducer;
