import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import commentReducer from '../features/comments/commentSlice';
import movieReducer  from '../features/movies/movieSlice';
import watchlistReducer  from '../features/watchlists/watchlistSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentReducer,
    movies : movieReducer,
    watchlist : watchlistReducer
  },
});
