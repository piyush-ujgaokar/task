import axios from "axios";


const api = axios.create({
    baseURL: 'https://task-6gbp.onrender.com',
    withCredentials: true,
    timeout: 5000
})

export const getDashboardData = async () => {
    try {
        const response = await api.get('/api/dashboard/status')
        return response.data
    } catch (error) {
        throw (error.response && error.response.data) ? error.response.data : { message: error.message || 'Network Error' }
    }
}

