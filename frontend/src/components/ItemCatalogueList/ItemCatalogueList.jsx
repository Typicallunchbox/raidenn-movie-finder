import { React, useEffect, useState } from "react";
import "../ItemCatalogueList/ItemCatalogueList.scss"
import axios from "axios";

const ItemCatalogueList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734"
      )
      .then((resp) => {
        setMovies(resp.data.results);
        console.log("response:", resp.data.results);
      });
  }, []);
  let image_path = "https://image.tmdb.org/t/p/original";

  const popularMovies = movies.map((movie) => (
    <>
      <img src={image_path + movie.poster_path}></img>
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
