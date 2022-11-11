import { addTag, addMovies } from '../features/movies/movieSlice';
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";

// get movies
// get movie videos
// get movies by search

export const GetPopularMovies = async(input) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}

export const GetMoviesByTag = async(tag) => {
    console.log('tag:', tag)
    return await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}

export const GetMoviesByPhrase = async(input) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734&query=${input}&language=en-US&page=1`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}

