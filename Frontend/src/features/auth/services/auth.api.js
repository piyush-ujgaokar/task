import axios from 'axios'


const api=axios.create({
    baseURL:'http://localhost:30000',
    withCredentials:true
})



export const loginUser=async({email,password})=>{
    try {
        const response=await api.post('/api/auth/login',{email,password})
        return response.data
    }catch (error) {
        throw error.response.data
    }
}

export const registerUser=async({name,email,password,role,reportsTo})=>{
    try {
        const response=await api.post('/api/auth/register',{name,email,password,role,reportsTo})
        return response.data
    }catch (error) {
        throw error.response.data
    }
}

export const createSuperAdmin=async({name,email,password})=>{
    try {
        const response=await api.post('/api/auth/create-super-admin',{name,email,password})
        return response.data
    }catch (error) {
        throw error.response.data
    }
}

export const logoutUser=async()=>{
    try {
        const response=await api.get('/api/auth/logout')
        return response.data
    }catch (error) {
        throw error.response.data
    }
}