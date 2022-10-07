import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getWatched, getWantToWatch, updateWatchlistRecord } from "../features/watchlists/watchlistSlice";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";

import Spinner from '../components/Spinner';


const Watchlist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {watched, wantToWatch, isLoading, isError, message} = useSelector((state) => state.watchlist) 

  useEffect(() => {
    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getWatched())

  }, [ user, navigate, dispatch, isError, message])
  
  if(isLoading){
    return <Spinner/>
  }




  return (
    <div className="mt-52">
      <div className="wantToWatch">
      {watched && <div className="catalogue">
      <ItemCatalogueList movies={watched} />
    </div>}
      </div>
    </div>
  );
};
export default Watchlist