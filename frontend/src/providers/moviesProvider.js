import axios from "axios";

/**
 *  Get Popular Movies
 *  @returns {array}
 */
export const GetPopularMovies = async() => {
    return await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}

/**
/*  Get Popular Movies
 *  @param {string} tag
 *  @returns {array}
 */
export const GetMoviesByTag = async(tag) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${tag}?api_key=120fe4d587d5f86c44f0a6e599f01734`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
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
 * @returns {array}
 */
 export const GetMovieById = async(id) => {
    await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=120fe4d587d5f86c44f0a6e599f01734&language=en-US`)
    .then((resp) => {
        return resp.data > 0 ? resp.data : []
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {array}
 */
 export const GetMovieImagesById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734&query=${id}&language=en-US&page=1`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}

/**
 * Get Popular Movies
 * @param {string} phrase
 * @returns {array}
 */
 export const GetMovieVideosById = async(id) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=120fe4d587d5f86c44f0a6e599f01734&query=${id}&language=en-US&page=1`)
    .then((resp) => {
        return resp.data.results.length > 0 ? resp.data.results : []
    });
}