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

  const removeFromList = (id) => {
    if(deleteWatched){
      dispatch(updateWatchlistRecord({_id: id, watched : false}))
    }
    else if(deleteWantToWatch){
      dispatch(updateWatchlistRecord({_id: id, wantToWatch : false}))
    }
  }

  let image_path = "https://image.tmdb.org/t/p/original";
  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {movies && movies.map((movie) => (
          <>
            <div className="relative" key={movie.id}>
              {movie.movie_id && <button onClick={() => {removeFromList(movie._id)}}  type="button" className="absolute top-0 right-0 z-10 border-0 text-white bg-red-700 hover:bg-red-800 text-center p-3 rounded-l-lg"><AiFillDelete/></button>}       
              <img onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
