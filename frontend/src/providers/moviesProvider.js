import axios from "axios";

/**
 *  Get Popular Movies
 *  @returns {array}
 */
export const GetPopularMovies = async() => {
    let movies = [];
    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734&page=1`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734&page=2`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734&page=3`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734&page=4`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });


    await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734&page=5`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    return movies.length > 0 ? movies : []
}

/**
/*  Get Popular Movies
 *  @param {string} tag
 *  @returns {array}
 */
export const GetMoviesByTag = async(tag) => {
    let movies = [];

    await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734&page=1`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734&page=2`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734&page=3`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734&page=4`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });

    await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734&page=5`)
    .then((resp) => {
        if(resp.data.results.length > 0){
            movies.push(...resp.data.results); 
        }
    });
    return movies.length > 0 ? movies : []

    // await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734&page=1`)
    // .then((resp) => {
    //     if(resp.data.results.length > 0){
    //         movies.push(...resp.data.results); 
    //     }
    // });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {array}
 */
export const GetMoviesByPhrase = async(phrase) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734&query=${phrase}&language=en-US&page=1`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {Promise<object>}
 */
 export const GetMovieById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`)
    .then((resp) => {
        return resp.data ? resp.data : null;
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {array}
 */
 export const GetMovieImagesById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        return resp.data  ? resp.data : [];
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {array}
 */
 export const GetMovieVideosById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : [];
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {array}
 */
export const GetMovieCreditsById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        return resp.data ? resp.data : [];
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {Promise<object>}
 */
export const GetGenreOptions = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        console.log('genres:', resp)
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
    console.log("search props:", searchText, releasedYear, genre);
    if (searchText === "") {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=120fe4d587d5f86c44f0a6e599f01734`;
        url += releasedYear !== "" ?`&primary_release_year=${releasedYear}` : "";
        url += genre !== "" ? `&with_genres=${genre}` : "";
        url += '&language=en-US&page=1&include_adult=false'
        console.log('URL:', url);
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
          `https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734${
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