import axios from 'axios'

const API_URL = '/api/comments/'

//Get Comments
const getComments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

//Get Comments by Movie ID
const getCommentsByMovieId = async (movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL +'movieId/'+ movieId, config)
    return response.data
}

//Create Comment
const createComment = async (commentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, commentData, config)
    return response.data
}

//Update Comment
const updateComment = async (userData) => {
    const response = await axios.put(API_URL, userData)
    return response.data
}

//Delete Comment
const deleteComment = async (commentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + commentId, config)
    return response.data
}

const commentService = {
    getComments,
    getCommentsByMovieId,
    createComment,
    deleteComment,
    updateComment
}

export default commentService