import { React} from "react";
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom';
import "../GenrePreferencesBar/GenrePreferencesBar.scss";

const GenrePreferencesBar = (props) => {
  const { movies} = props;
  const image_path = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  return (
    <div className="genre-preferences-section">
        <h2>Recommended Movies for you</h2>
    <div className="inner-container">
      {movies && movies.map((movie) => (
          <div key={movie.id ? movie.id : movie.movie_id} className="relative">
            <Link to={`/movie/${movie.id ? movie.id : movie.movie_id}`}>
              <img className="hover:cursor-pointer" onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
            </Link>
          </div>
      ))}
    </div>
  </div>
  );
};

export default GenrePreferencesBar;
