import Spinner from '../components/Spinner';
import {useNavigate} from 'react-router-dom'
import { React, useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { addMovies } from '../features/movies/movieSlice';
import {GetPopularMovies, GetMoviesByTag} from "../providers/moviesProvider";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";


const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {tag, movies} = useSelector((state) => state.movies) 
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    async function setPopularMovies(){
      setIsLoading(true);
      const movies =  await GetPopularMovies();
      dispatch(addMovies(movies))
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }

    async function setMoviesByTag(){
      setIsLoading(true);
      const movies =  await GetMoviesByTag(tag);
      dispatch(addMovies(movies))
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }

    tag === '' ? setPopularMovies() : setMoviesByTag();
  }, [tag, dispatch]);

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className="home-page"> 
      <div className="container">
        {user && <div className="catalogue mt-52">
          <ItemCatalogueList movies={movies} />
        </div>}
        <p className="pt-16 mb-52">Search maybe for what you are looking for* Add Background lightning animation*</p>

      </div>
    </div>
  );
};

export default Home