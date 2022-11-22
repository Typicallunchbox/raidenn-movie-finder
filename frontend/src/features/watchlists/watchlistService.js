import axios from 'axios'

const API_URL = '/api/watchlist/'

//Get watched movies
const getWatched = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'watched', config)
    return response.data
}

//Get want to watch movies
const getWantToWant = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'wantToWatch', config)
    return response.data
}

//Get want to watch movie record
const getWantToWatchRecord = async (watchListData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log('config:', config)
    const response = await axios.get(API_URL + 'wantToWatchRecord', watchListData, config)
    return response.data
}
//Get watchlist for user
const getWatchlistByUserId = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL , config)
    return response.data
}

//Create Watchlist Record
const createWatchlistRecord = async (watchListData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, watchListData, config)
    return response.data
}

//Update Watchlist Record
const updateWatchlistRecord = async (watchlistData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL, watchlistData, config)
    return response.data
}

//Delete Watchlist Record
const deleteWatchlistRecord = async (Id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL, Id, config)
    return response.data
}



// const logout = () => {
//     localStorage.removeItem('user')
// }

const commentService = {
    getWatched,
    getWantToWant,
    getWantToWatchRecord,
    getWatchlistByUserId,
    createWatchlistRecord,
    deleteWatchlistRecord,
    updateWatchlistRecord
}

export default commentService