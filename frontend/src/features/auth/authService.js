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

//Register User
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login User
const login2 = async (userData) => {
    const response = await axios.post(API_URL + 'login2', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const getMe = async () => {
    const response = await axios.get(API_URL + 'me')

    // if(response.data){
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    return response.data
}

const authService = {
    register,
    login,
    login2,
    getMe,
    logout
}

export default authService