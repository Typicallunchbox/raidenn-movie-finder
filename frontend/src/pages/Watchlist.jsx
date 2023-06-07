import Spinner from '../components/Spinner';
import {useNavigate} from 'react-router-dom';
import { React, useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { getWatched, getWantToWatch } from "../features/watchlists/watchlistSlice";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";
import { Helmet, HelmetProvider } from "react-helmet-async";


const Watchlist = (props) => {
  const {title} = props;
  const [listType, setListType] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false);
  const {watched, wantToWatch, isError, message} = useSelector((state) => state.watchlist) 

  useEffect(() => {
    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    if(listType === ''){
      setIsLoading(true);
      setListType('wantToWatch')
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    }

    dispatch(getWatched())
    dispatch(getWantToWatch())
    

    

  }, [ user, listType, navigate, dispatch, isError, message])
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className='watchlist-page'>
      <HelmetProvider>
          <Helmet>
            <title>{`Raidenn ${'- '+ title || ''}`}</title>
          </Helmet>
      </HelmetProvider>
      <h2 className='mt-12'>My Watchlist</h2>
      <div className="selectWatchlistOptions flex gap-4 p-4 w-full pl-10 text-md md:gap-14 md:w-7/12 md:text-xl md:pl-32 xl:w-5/12">
          <p className={listType === 'wantToWatch' ? 'optionSelected' : ''} onClick={() => setListType('wantToWatch')}>Want to watch movies</p>
          <p className={listType === 'watched' ? 'optionSelected' : ''} onClick={() => setListType('watched')}>Watched movies</p>
      </div>
      <div className='container'>

        <div className='mt-20 mb-40'>
          {listType === 'wantToWatch' &&
          <div className='wantToWatch'>
            {wantToWatch && (
              <div className='catalogue'>
                <ItemCatalogueList deleteOption allowDeleteWantToWatch={true} allowDeleteWatched={false} movies={wantToWatch} />
              </div>
            )}
          </div>}
          {listType === 'watched' &&
          <div className='watched'>
            {watched && (
              <div className='catalogue'>
                <ItemCatalogueList deleteOption allowDeleteWatched={true} allowDeleteWantToWatch={false} movies={watched} />
              </div>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
};
export default Watchlist