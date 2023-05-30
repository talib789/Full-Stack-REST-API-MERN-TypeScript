import axios from "axios"

const API_URL = 'http://localhost:5000/api/users/'

// Register user
const register = async (userData: any) => {
    console.log(userData)
    const response = await axios.post(API_URL, userData, {"headers" : {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
    }})

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData: any) => {
    console.log(userData)
    const response = await axios.post(API_URL + 'login', userData, {"headers" : {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
    }})

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register, logout, login
}

export default authService