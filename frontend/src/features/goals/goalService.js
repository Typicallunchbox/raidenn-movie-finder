import axios from 'axios'

const API_URL = '/api/goals/'

//Get Goals
const getGoals = async (token) => {
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
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config)
    return response.data
}

//Update Goal
const updateGoal = async (userData) => {
    const response = await axios.put(API_URL, userData)
    return response.data
}

//Delete Goal
const deleteGoal = async (goalId, token) => {
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

const goalService = {
    getGoals,
    createGoal,
    deleteGoal,
    updateGoal
}

export default goalService