import { React, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import { useParams } from 'react-router-dom';


// import axios from "axios";

const Movie = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  console.log('id:', id)


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

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`
      )
      .then((resp) => {
        console.log(resp)
      });
  }, []);
  

  return (
    <div className="container">

    </div>
  );
};
export default Movie