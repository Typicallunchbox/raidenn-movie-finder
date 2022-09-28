import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import { useParams } from 'react-router-dom';


// import axios from "axios";

const Movie = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();

  const {user} = useSelector((state) => state.auth)
  const { isError, message} = useSelector((state) => state.goals) 
  const [movie, setMovie] = useState(null);
  let image_path = "https://image.tmdb.org/t/p/original";

  const [comments, setComments] = useState([
    {
      commentId: '0',
      movieId:'532639',
      userId:'user-1',
      rating: 0,
      message:'Cool movie'
    },
    {
      commentId: '1',
      movieId:'532639',
      userId:'user-1',
      rating: 0,
      message:'Was alright'
    },
    {
      commentId: '2',
      movieId:'532639',
      userId:'user-1',
      rating: 0,
      message:'Cool story'
    }
  ]);


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
        console.log('Movie:',resp.data)
        setMovie(resp.data);
      });
  }, []);
  

  return (
    <>
      {movie && (
        <div className='container movie-container'>
          {/* {movie && <p>{movie.original_title}</p>} */}
          <div className="movieInfo">
            <img src={image_path + movie.poster_path} alt='movie'></img>
            <p><b>Title</b> : {movie.title}</p>
            <p><b>Genres</b> : </p>
            <div className="genres">
            {/* CREATE STANDARD REUSABLE BUTTONS, LINK W/ or W/ OUT borders etc. */}
            {movie.genres.map((genre)=>{
              return <a key={genre.id}>{genre.name}</a>
            })}</div>
            <p><b>Status</b> : {movie.status}</p>
            <p><b>Popularity</b> : {movie.popularity}</p>
            <p><b>Budget</b> : {movie.budget}</p>
          </div>
          <div className="card w-full text-left">
            {/* comment section */}
            <h1>Comments</h1>
            <div className="comments">
              {comments && comments.map((comment) => (
                <div className="card border-default mb-2">
                  <user>{comment.userId}</user>
                  <p>{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Movie