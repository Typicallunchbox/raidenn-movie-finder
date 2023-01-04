import Spinner from '../components/Spinner';
import {useNavigate} from 'react-router-dom'
import { React, useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getWatched, getWantToWatch } from "../features/watchlists/watchlistSlice";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";


const Watchlist = () => {
  const [listType, setListType] = useState('')
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
    
    if(listType === ''){
      setListType('wantToWatch')
    }
    dispatch(getWatched())
    dispatch(getWantToWatch())

  }, [ user, listType, navigate, dispatch, isError, message])
  
  
  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <div className="selectWatchlistOptions">
          <p className={listType === 'wantToWatch' ? 'optionSelected' : ''} onClick={() => setListType('wantToWatch')}>Want to watch movies</p>
          <p className={listType === 'watched' ? 'optionSelected' : ''} onClick={() => setListType('watched')}>Previously watched movies</p>
      </div>
      <div className='container'>
        <div className='mt-20 '>
          {listType === 'wantToWatch' &&
          <div className='wantToWatch'>
            {wantToWatch && (
              <div className='catalogue'>
                <ItemCatalogueList deleteWantToWatch={true} deleteWatched={false} movies={wantToWatch} />
              </div>
            )}
          </div>}
          {listType === 'watched' &&
          <div className='watched'>
            {watched && (
              <div className='catalogue'>
                <ItemCatalogueList deleteWatched={true} deleteWantToWatch={false} movies={watched} />
              </div>
            )}
          </div>}
        </div>
      </div>
    </>
  );
};
export default Watchlist