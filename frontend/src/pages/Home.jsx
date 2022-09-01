import { React, useEffect, useState } from "react";
import axios from "axios";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";

const Home = () => {
  const [movies, setMovies] = useState([]);

  //get popular movies
  //get popular series
  // get genres
  // get upcoming
  //get similiar movies
  // api rate endpoint available
  //discover movies endpoint available

  //example : https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734

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

  return (
    <div className="home container">
      <div className="catalogue">
        <ItemCatalogueList />
      </div>
    </div>
  );
};
export default Home