import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getWatched, getWantToWatch, updateWatchlistRecord } from "../features/watchlists/watchlistSlice";
import Spinner from '../components/Spinner';


const Watchlist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {watchlist, isLoading, isError, message} = useSelector((state) => state.watchlist) 
  
  if(isLoading){
    return <Spinner/>
  }




  return (
    <>
      <div className="wantToWatch">
        hi
      </div>
    </>
  );
};
export default Watchlist