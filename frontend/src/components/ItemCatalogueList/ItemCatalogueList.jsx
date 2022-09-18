import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import "../ItemCatalogueList/ItemCatalogueList.scss"
import axios from "axios";


const ItemCatalogueList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate()

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734"
      )
      .then((resp) => {
        setMovies(resp.data.results);
      });
  }, []);

 

  let image_path = "https://image.tmdb.org/t/p/original";
  console.log('movies:', movies)
  const popularMovies = movies.map((movie) => (
    <>
    <div key={movie.id}>
      <img onClick={() => viewMovie(movie.id)} src={image_path + movie.poster_path}></img>
    </div>
    </>
  ));
  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {popularMovies}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
