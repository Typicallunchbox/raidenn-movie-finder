import Spinner from '../components/Spinner';
import {useNavigate} from 'react-router-dom'
import { React, useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { addMovies } from '../features/movies/movieSlice';
import {GetPopularMovies, GetMoviesByTag, GetMoviesByGenre} from "../providers/moviesProvider";
import ItemCatalogueList from "../components/ItemCatalogueList/ItemCatalogueList";
import {Link} from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {tag, movies} = useSelector((state) => state.movies) 
  const [recommendedMovies, setRecommendedMovies] = useState([]) 
  const [genreRecommened, setGenreRecommened] = useState('') 
  const [isLoading, setIsLoading] = useState(false);
  const image_path = "https://image.tmdb.org/t/p/original";

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const viewMovie = (id) => {
    if(id){
      navigate('/movie/' + id)
    }
  }

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    setRecommendedMovies([]);

  }, [user, navigate, dispatch])

  useEffect(() => {
    async function setPopularMovies(){
      setIsLoading(true);
      const movies =  await GetPopularMovies();
      dispatch(addMovies(movies))
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
      
      if(user && user?.genrePreferences.length > 0 && recommendedMovies.length === 0){  
        const genre =  user.genrePreferences[Math.floor(Math.random() *  user.genrePreferences.length)];
        const recommended =  await GetMoviesByGenre(genre.id);
        setGenreRecommened(genre.name);
        setRecommendedMovies(recommended.results);
      }
    }

    async function setMoviesByTag(){
      setIsLoading(true);
      const movies =  await GetMoviesByTag(tag);
      dispatch(addMovies(movies))
      setTimeout(() => {
        setIsLoading(false);
      }, 500); 
    }

    tag === '' ? setPopularMovies() : setMoviesByTag();
  }, [tag, dispatch, user, recommendedMovies]);

  if(isLoading){
    return <Spinner/>
  }

  return (
    <div className="home-page">
      <div className="genre-preferences-section">
        {recommendedMovies && recommendedMovies.length > 0 && <div className="inner-container">
          <div className='flex items-baseline gap-4'>
            <h3 className='pl-32 text-lg b-text-colour'>Recommended:</h3>
            <p>{genreRecommened} Movies</p>
          </div>
          <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={8000}>
            {recommendedMovies.map((movie) => (
              <div key={movie.id ? movie.id : movie.movie_id} className="relative">
                <Link to={`/movie/${movie.id ? movie.id : movie.movie_id}`}>
                  <img className="hover:cursor-pointer" onClick={() => viewMovie(movie.id ? movie.id : movie.movie_id)} src={movie.poster_path ? image_path + movie.poster_path : image_path + movie.movie_image} alt='movie-list'></img>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>}
      </div>
      <div className="container">
        {user && 
        <div className="catalogue mt-20 md:mt-52">
          <p className='pl-10 text-lg text-left mb-10'>Movie Results :</p>
          <ItemCatalogueList movies={movies} />
        </div>
        }
        <p className="pt-16 mb-52">Search maybe for what you are looking for :)</p>
      </div>
    </div>
  );
};

export default Home