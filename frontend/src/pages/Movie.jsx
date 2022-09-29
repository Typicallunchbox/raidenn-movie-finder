import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FaStar,  } from "react-icons/fa";
import { BiStar  } from "react-icons/bi";
import Rating from "react-rating";
import { createComment, getCommentsByMovieId } from "../features/comments/commentSlice";
import { reset } from '../features/auth/authSlice'



// import axios from "axios";

const Movie = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();

  const {user} = useSelector((state) => state.auth)
  const {comments, isLoading, isError, message} = useSelector((state) => state.comments) 
  const [movie, setMovie] = useState(null);
  let image_path = "https://image.tmdb.org/t/p/original";

  const onSubmit = (e) => {
    if(text && rating && id){
      dispatch(createComment({"comment": text, "rating":rating, "movie_id": `${id}`}))
      setText('')
    }
  };


  useEffect(() => {
    if(!isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getCommentsByMovieId(id))
    return() => {
      dispatch(reset())
    }
  }, [comments, user, navigate, dispatch, isError, message])

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`
      )
      .then((resp) => {
        setMovie(resp.data);
      });
  }, []);

  const setMovieRating = (val) => {
    setRating(val);
  }
  

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
          <div className="card comment-section w-full text-left ">
            {/* comment section */}
            <h1>Comments</h1>
            <div className="comments border-b-2 border-blue-200">
              {comments && comments.map((comment) => (
                <div className="card border-default mb-2">
                  <user>{comment.user}</user>
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
            <div>
              <div class="my-2">
                  <p> Rate Movie : <Rating onClick={(val)=>{setMovieRating(val)}} emptySymbol={<BiStar/>} fullSymbol={<FaStar/>}/></p>
              </div>
              <div className="controls flex my-2 gap-2">
                  <input onChange={(e) => setText(e.target.value)} value={text} type="text" id="comment" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Add your thoughts about the movie..." required></input>
                  <button onClick={() => {onSubmit()}}  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2.5 text-center">Send</button>            
             </div>
            </div>
            

  
          </div>
        </div>
      )}
    </>
  );
};
export default Movie