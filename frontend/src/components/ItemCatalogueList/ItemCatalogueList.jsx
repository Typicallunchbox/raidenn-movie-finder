import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "../ItemCatalogueList/ItemCatalogueList.scss"
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";



const ItemCatalogueList = (props) => {
  const { movies, deleteWantToWatch, deleteWatched } = props;
  const navigate = useNavigate()

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  const removeFromList = (id) => {

  }


  let image_path = "https://image.tmdb.org/t/p/original";
  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {movies && movies.map((movie) => (
          <>
            <div className="relative" key={movie.id}>
              {movie.movie_id && <button onClick={() => removeFromList(movie.movie_id)}  type="button" className="absolute top-0 right-0 z-10 border-0 text-white bg-red-700 hover:bg-red-800 text-sm sm:w-auto px-6 py-2.5 text-center">Del</button>}       
              <img onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
