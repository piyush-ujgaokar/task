import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})


export const getDashboardData = async () => {
    try {
        const response = await api.get('/api/dashboard')
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

