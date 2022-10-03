import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalsReducer from '../features/goals/goalSlice';
import commentReducer from '../features/comments/commentSlice';
import movieReducer  from '../features/movies/movieSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
    comments: commentReducer,
    movies : movieReducer
  },
});
