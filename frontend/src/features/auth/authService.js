import axios from 'axios'

const API_URL = '/api/users/'

//Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout User
const logout = () => {
    localStorage.removeItem('user')
}

//Reset Password
const updatePassword = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'updatePassword', userData, config)
    if(response.data?.status === 'OK'){
        localStorage.removeItem('user')
    }
    return response.data
}

//getMe User
const getMe = async () => {
    const response = await axios.get(API_URL + 'me')
    return response.data
}

//Get Security Questions
const getSecurityQuestions = async (data) => {
    const response = await axios.post(API_URL + 'userQuestions', data)
    return response.data
}

//Set Security Questions
const setSecurityQuestions = async (userData) => {
    const response = await axios.put(API_URL, userData)
    return response.data
}

//Compare Security Questions Answers
const compareSecurityAnswers = async (data) => {
    const response = await axios.post(API_URL + 'userQuestions', data)
    return response.data
}

const authService = {
    register,
    login,
    getMe,
    logout,
    updatePassword,
    getSecurityQuestions,
    setSecurityQuestions,
    compareSecurityAnswers
}

export default authService