import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "../ItemCatalogueList/ItemCatalogueList.scss"
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";



const ItemCatalogueList = (props) => {
  const { movies } = props;
  console.log('movies:', movies)
  const navigate = useNavigate()

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  

 

  let image_path = "https://image.tmdb.org/t/p/original";
  const renderMovies = movies && movies.map((movie) => (
    <>
    <div key={movie.id}>
      <img onClick={() => viewMovie(movie.id)} src={image_path + movie.poster_path} alt='movie-list'></img>
    </div>
    </>
  ));
  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {renderMovies}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
