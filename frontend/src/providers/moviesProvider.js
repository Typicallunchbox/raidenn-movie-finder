import axios from "axios";

/**
 *  Get Popular Movies
 *  @returns {array}
 */
export const GetPopularMovies = async() => {
    let movies = [];
    const count = 10;
    for (let i = 1; i < count; i++) {
        await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&page=${i}`)
        .then((resp) => {
            if(resp.data.results.length > 0){
                movies.push(...resp.data.results); 
            }
        });
    }
    return movies.length > 0 ? movies : []
}

/**
/*  Get Movies by tag
 *  @param {string} tag
 *  @returns {array}
 */
export const GetMoviesByTag = async(tag) => {
    let movies = [];
    const count = 10;
    for (let i = 1; i < count; i++) {
        await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&page=${i}`)
        .then((resp) => {
            if(resp.data.results.length > 0){
                movies.push(...resp.data.results); 
            }
        });
    }
    return movies.length > 0 ? movies : []
}

/**
 * Get Movies by phrase
 * @param {string} phrase
 * @returns {array}
 */
export const GetMoviesByPhrase = async(phrase) => {
    let movies = [];
    const count = 5;
    for (let i = 1; i < count; i++) {
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&query=${phrase}&language=en-US&page=${1}`)
        .then((resp) => {
            if(resp.data.results.length > 0){
                movies.push(...resp.data.results); 
            }
        });
    }
}

/**
 * Get Movies by movie id
 * @param {string} id
 * @returns {Promise<object>}
 */
 export const GetMovieById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`)
    .then((resp) => {
        return resp.data ? resp.data : null;
    });
}

/**
 * Get Movies Images by movie id
 * @param {string} id
 * @returns {array}
 */
 export const GetMovieImagesById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`)
    .then((resp) => {
        return resp.data  ? resp.data : [];
    });
}

/**
 * Get Movies Videos by movie id
 * @param {string} phrase
 * @returns {array}
 */
 export const GetMovieVideosById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : [];
    });
}

/**
 * Get Movies Credits by movie id
 * @param {string} phrase
 * @returns {array}
 */
export const GetMovieCreditsById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`)
    .then((resp) => {
        return resp.data ? resp.data : [];
    });
}

/**
 * Get Movies By Genre
 * @param {string} phrase
 * @returns {Promise}
 */
export const GetMoviesByGenre = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&with_genres=${id}`)
    .then((resp) => {
        return resp.data ? resp.data : [];
    });
}

/**
 * Get Movies Genre Options
 * @param {string} phrase
 * @returns {Promise<object>}
 */
export const GetGenreOptions = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`)
    .then((resp) => {
        return resp.data && resp.data.genres ? resp.data.genres : [];
    });
}

/**
 * Get Searched Movies
 * @param {string} searchText
 * @param {string} releasedYear
 * @param {string} genre
 * @returns {Promise<object>}
 */
export const searchMovies = async(searchText = "", releasedYear, genre) => {
    if (searchText === "") {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`;
        url += releasedYear !== "" ?`&primary_release_year=${releasedYear}` : "";
        url += genre !== "" ? `&with_genres=${genre}` : "";
        url += '&language=en-US&page=1&include_adult=false'
        return axios
          .get(
            url
          )
          .then((resp) => {
            const results = resp.data.results;
            return results.length > 0 ? results.filter(movie => movie.backdrop_path) : [];
          });
      }
    
      return axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}${
            searchText !== "" ? `&query=${searchText}` : `&query=''`
          }${releasedYear !== "" ? `&primary_release_year=${releasedYear}` : ""}${
            genre !== "" ? `&with_genres=${genre}` : ""
          }&language=en-US&page=1&include_adult=false`
        )
        .then((resp) => {
            const results = resp.data.results;
            return results.length > 0 ? results.filter(movie => movie.backdrop_path) : [];
        });
}