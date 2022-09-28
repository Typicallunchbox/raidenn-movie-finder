import axios from 'axios'

const API_URL = '/api/comments/'

//Get Goals
const getComments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    console.log('response:',response)
    return response.data
}

//Create Goal
const createComment = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config)
    return response.data
}

//Update Goal
const updateComment = async (userData) => {
    const response = await axios.put(API_URL, userData)
    return response.data
}

//Delete Goal
const deleteComment = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalId, config)
    return response.data
}



// const logout = () => {
//     localStorage.removeItem('user')
// }

const commentService = {
    getComments,
    createComment,
    deleteComment,
    updateComment
}

export default commentService