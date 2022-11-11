import { React, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import ThreeJsFiberScreen from "../components/ThreeJsFiberScreen/ThreeJsFiberScreen";
import { addMovies } from '../features/movies/movieSlice';
import {GetPopularMovies, GetMoviesByTag} from "../providers/moviesProvider";


// import axios from "axios";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const { isError,isLoading, message} = useSelector((state) => state.goals) 
  const {tag, movies} = useSelector((state) => state.movies) 

  useEffect(() => {

    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }
  }, [user, navigate, dispatch, isError, message])

  useEffect(() => {
    async function setPopularMovies(){
      const movies =  await GetPopularMovies();
      dispatch(addMovies(movies))
    }

    async function setMoviesByTag(){
      const movies =  await GetMoviesByTag(tag);
      dispatch(addMovies(movies))
    }

    tag === '' ? setPopularMovies() : setMoviesByTag();
  }, [tag]);

  return (
    <> 
    <div className="container">
      {user && <div className="catalogue mt-52">
        <ItemCatalogueList movies={movies} />
      </div>}
    </div>
    <div className="recommendations">
        <ThreeJsFiberScreen />
    </div>
    </>
  );
};

export default Home