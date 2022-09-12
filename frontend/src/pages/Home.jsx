import { React, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'


// import axios from "axios";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { isError, message} = useSelector((state) => state.goals) 


  useEffect(() => {
    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }
  }, [user, navigate, dispatch, isError, message])
  // const [movies, setMovies] = useState([]);

  //get popular movies
  //get popular series
  // get genres
  // get upcoming
  //get similiar movies
  // api rate endpoint available
  //discover movies endpoint available

  //example : https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734"
  //     )
  //     .then((resp) => {
  //       setMovies(resp.data.results);
  //       console.log("response:", resp.data.results);
  //     });
  // }, []);

  return (
    <div className="container">
      {user &&<div className="catalogue">
        <ItemCatalogueList />
      </div>}
    </div>
  );
};
export default Home