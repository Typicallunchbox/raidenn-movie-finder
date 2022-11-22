import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import "../ItemCatalogueList/ItemCatalogueList.scss";
import { updateWatchlistRecord } from "../../features/watchlists/watchlistSlice";
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";


const ItemCatalogueList = (props) => {
  const { movies, deleteWantToWatch, deleteWatched } = props;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  const removeFromList = (data) => {
    let m = {...data};
    if(deleteWatched){
      m.watched = false;
      dispatch(updateWatchlistRecord({movie: m}))
    }
    else if(deleteWantToWatch){
      console.log('Movie:', m)
      m.wantToWatch = false;
      dispatch(updateWatchlistRecord({movie: m}))
    }
  }

  let image_path = "https://image.tmdb.org/t/p/original";
  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {movies && movies.map((movie) => (
          <div key={movie.id ? movie.id : movie.movie_id}>
            <div className="relative">
              {movie.movie_id && <button onClick={() => {removeFromList(movie)}}  type="button" className="absolute top-0 right-0 z-10 border-0 text-white bg-red-700 hover:bg-red-800 text-center p-3 rounded-l-lg"><AiFillDelete/></button>}       
              <img onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
