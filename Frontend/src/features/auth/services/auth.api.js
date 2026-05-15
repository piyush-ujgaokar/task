import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    timeout: 5000
})



export const loginUser = async ({ email, password }) => {
    try {
        const response = await api.post('/api/auth/login', { email, password })
        return response.data
    } catch (error) {
        throw (error.response && error.response.data) ? error.response.data : { message: error.message || 'Network Error' }
    }
}

export const registerUser = async ({ name, email, password, role, reportsTo }) => {
    try {
        const response = await api.post('/api/auth/register', { name, email, password, role, reportsTo })
        return response.data
    } catch (error) {
        throw (error.response && error.response.data) ? error.response.data : { message: error.message || 'Network Error' }
    }
}

export const createSuperAdmin = async ({ name, email, password }) => {
    try {
        const response = await api.post('/api/auth/create-super-admin', { name, email, password })
        return response.data
    } catch (error) {
        throw (error.response && error.response.data) ? error.response.data : { message: error.message || 'Network Error' }
    }
}

export const logoutUser = async () => {
    try {
        const response = await api.get('/api/auth/logout')
        return response.data
    } catch (error) {
        throw (error.response && error.response.data) ? error.response.data : { message: error.message || 'Network Error' }
    }
}

export const getme = async () => {
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data
    } catch (error) {
        throw (error.response && error.response.data) ? error.response.data : { message: error.message || 'Network Error' }
    }
}