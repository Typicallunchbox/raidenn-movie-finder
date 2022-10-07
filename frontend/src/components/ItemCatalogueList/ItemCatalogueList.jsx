import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "../ItemCatalogueList/ItemCatalogueList.scss"
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";



const ItemCatalogueList = (props) => {
  const { movies } = props;
  const navigate = useNavigate()

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  

 

  let image_path = "https://image.tmdb.org/t/p/original";
  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {movies && movies.map((movie) => (
          <>
            <div key={movie.id}>
              <img onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
