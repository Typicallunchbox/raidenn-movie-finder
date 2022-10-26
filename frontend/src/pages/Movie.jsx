import { React, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FaStar,  } from "react-icons/fa";
import { BiStar  } from "react-icons/bi";
import { AiFillEye, AiFillPlusCircle } from "react-icons/ai";

import Rating from "react-rating";
import { createComment, getCommentsByMovieId } from "../features/comments/commentSlice";
import { createWatchlistRecord, getWantToWatchRecord } from "../features/watchlists/watchlistSlice";
import { reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { ColourPalette } from "../components/ColourPalette/ColourPalette";
import Filter from 'bad-words';





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
  const [movieVideos, setMovieVideos] = useState(null);

  let image_path = "https://image.tmdb.org/t/p/original";
  let colours = ColourPalette(movie ? (image_path + movie?.poster_path) : []);
 
  const onSubmit = (e) => {
    let filter = new Filter();
    if(text && rating && id){
      dispatch(createComment({"comment": filter.clean(text), "rating":rating, "movie_id": `${id}`}))
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

    let temp = getWantToWatchRecord({movie_id : id})
    console.log('temp:', temp)

    dispatch(getCommentsByMovieId(id))
    return() => {
      dispatch(reset())
    }
  }, [id, user, navigate, dispatch, isError, message])
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`
      )
      .then((resp) => {
        setMovie(resp.data);
      });

      axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`
      )
      .then((resp) => {
        let res = resp.data.results;
        let temp = [];

        if(res.length > 0){
          for (let index = 0; index < res.length; index++) {
            const element = res[index];

            if(element.type == 'Trailer'){
              temp.push(element)
            }
          }
          console.log('Videos:', temp)
          setMovieVideos(temp);
        }
      });
  }, [id]);

  const setMovieRating = (val) => {
    setRating(val);
  }
  
  if(isLoading){
    return <Spinner/>
  }

  const addToWantToWatchList = (val) => {
    if(movie){
      let genres = []
      for (let index = 0; index < movie.genres.length; index++) {
        const element = movie.genres[index]; 
        genres.push(element.name);
      }

      dispatch(createWatchlistRecord({
        movie_id : id,
        movie_genre : genres,
        movie_image : image_path + movie.poster_path,
        wantToWatch : true
      }))
    }
  }

  const addToWatchedList = (val) => {
    if(movie){
      let genres = []
      for (let index = 0; index < movie.genres.length; index++) {
        const element = movie.genres[index]; 
        genres.push(element.name);
      }

      dispatch(createWatchlistRecord({
        movie_id : id,
        movie_genre : genres,
        movie_image : image_path + movie.poster_path,
        watched : true
      }))
    }
  }


  return (
    <>
      <div className="p-0.5"  style={colours ? {background: `linear-gradient(90deg,rgba(0,0,0,0),${colours[0]}, ${colours[1]}, ${colours[2]}, ${colours[3]}, ${colours[4]}, rgba(0,0,0,0))`} : {}}></div>
      {movie && (
        <div className="container">
          <div className='movie-container mb-20 mt-5'>
            <div className="movieInfo">
              <img src={image_path + movie.poster_path} alt='movie'></img>
              <div className="buttons flex justify-evenly gap-1 mt-2">
                <button className='w-full flex gap-3 p-3' onClick={() => {addToWantToWatchList()}} > <AiFillPlusCircle/>Watchlist</button>
                <button className='w-full flex gap-3 p-3' onClick={() => {addToWatchedList()}} > <AiFillEye/> Watched</button>
                {/* <button onClick={() => {window.open(movie.homepage ?? '', "_blank");}} className='w-full'>Site</button> */}
              </div>
              <button className='w-full mt-1'>Watch Now</button>

              <p><b>Title</b> : {movie.title}</p>
              <p><b>Genres</b> : </p>
              <div className="genres">
              {/* CREATE STANDARD REUSABLE BUTTONS, LINK W/ or W/ OUT borders etc. */}
              {/* SANITIZE EVERYTHING */}
              {movie.genres.map((genre)=>{
                return <span key={genre.id}>{genre.name}</span>
              })}
              </div>
              <p><b>Status</b> : {movie.status}</p>
              <p><b>Popularity</b> : {movie.popularity}</p>
              <p><b>Budget</b> : {movie.budget}</p>
            </div>
            <div className="card border-0 w-full text-left overflow-hidden">
              {movieVideos && 
              <div className="trailer w-full h-full">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${movieVideos[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
              </div>}
            </div>
          </div>
          <div className="card p-4 comment-section w-full text-left">
                    <h1>Comments</h1>
                    <div className="comments">
                      {comments && comments.map((comment) => (
                        <div className="card border-default mb-2 p-3">
                          <span>{comment.user}</span>
                          <p>{comment.comment}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-px"  style={colours ? {background: `linear-gradient(90deg,rgba(0,0,0,0),${colours[0]}, ${colours[1]}, ${colours[2]}, rgba(0,0,0,0))`} : {}}></div>
                    <div>
                      <div className="my-2">
                          <p> Rate Movie : <Rating onClick={(val)=>{setMovieRating(val)}} emptySymbol={<BiStar/>} fullSymbol={<FaStar/>}/></p>
                      </div>
                      <div className="controls flex my-2 gap-2">
                          <input onChange={(e) => setText(e.target.value)} value={text} type="text" id="comment" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Add your thoughts about the movie..." required></input>
                          <button onClick={() => {onSubmit()}}  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2.5 text-center">Send</button>            
                    </div>
                    </div>
                    
        
          
          </div>
        </div>
        
      )}
    </>
  );
};
export default Movie