import { React} from "react";
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import "../ItemCatalogueList/ItemCatalogueList.scss";
import { updateWatchlistRecord } from "../../features/watchlists/watchlistSlice";

const ItemCatalogueList = (props) => {
  const image_path = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { movies, deleteWantToWatch, deleteWatched } = props;
  
  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  const removeFromList = (data) => {
    let m = {...data};
    if(deleteWatched){
      m.watched = false;
      dispatch(updateWatchlistRecord({movie: m}))
    }
    else if(deleteWantToWatch){
      m.wantToWatch = false;
      dispatch(updateWatchlistRecord({movie: m}))
    }
  }

  return (
    <div className="item-catalogue-list-container">
      <div className="inner-container">
        {movies && movies.map((movie) => (
          <div key={movie.id ? movie.id : movie.movie_id}>
            <div className="relative">
              {movie.movie_id && <button onClick={() => {removeFromList(movie)}}  type="button" className="absolute top-0 right-0 z-10 border-0 text-white bg-red-700 hover:bg-red-800 text-center p-3 rounded-l-lg"><AiFillDelete/></button>}       
              <img onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCatalogueList;
