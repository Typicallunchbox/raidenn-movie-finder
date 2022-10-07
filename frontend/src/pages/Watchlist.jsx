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
  const {watchlist, isLoading, isError, message} = useSelector((state) => state.watchlist) 
  const [watched, setWatched] = useState([]);
  const [wantToWatch, setWantToWatch] = useState([]);

  useEffect(() => {
    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    setWatched(dispatch(getWatched()))

  }, [ user, navigate, dispatch, isError, message])
  
  if(isLoading){
    return <Spinner/>
  }




  return (
    <>
      <div className="wantToWatch">
      {user && watched && <div className="catalogue">
      <ItemCatalogueList movies={watched} />
    </div>}
      </div>
    </>
  );
};
export default Watchlist