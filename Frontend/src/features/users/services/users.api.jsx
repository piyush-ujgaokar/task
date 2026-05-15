import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})



export const getUsers = async () => {
    try {
        const response = await api.get('/api/users')
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateUser = async ({ id, ...data }) => {
    try {
        const response = await api.patch(`/api/users/${id}`, data)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const deleteUser = async ({ id }) => {
    try {
        const response = await api.delete(`/api/users/${id}`)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}