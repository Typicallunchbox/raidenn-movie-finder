import { React, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import ThreeJsFiberScreen from "../components/ThreeJsFiberScreen/ThreeJsFiberScreen";
import { addMovies } from '../features/movies/movieSlice';


// import axios from "axios";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";

const Home = () => {

 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const { isError, message} = useSelector((state) => state.goals) 
  const {tag, movies} = useSelector((state) => state.movies) 
  // const [movies, setMovies] = useState([]);

  useEffect(() => {

    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }
  }, [user, navigate, dispatch, isError, message])

  useEffect(() => {
    function scrollPlay() {
      // var scrollTop = document.querySelector("root").scrollTop;
      // console.log('val:', scrollTop)
      // var frameNumber = scrollTop/playbackConst;
      // vid.currentTime = frameNumber;
      // window.requestAnimationFrame(scrollPlay);
    }
    if(window != undefined){
        window.addEventListener("scroll", (event) => {
          let scroll = Math.round(window.scrollY * 100) / 100
          console.log(scroll)
      });
    }

    if(tag === ''){
      axios.get("https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734")
      .then((resp) => {
        dispatch(addMovies(resp.data.results))
      });
    }else{
      axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734`)
      .then((resp) => {
        dispatch(addMovies(resp.data.results))
      });
    }
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