import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})



export const getTasks = async () => {
    try {
        const response = await api.get('/api/tasks')
        return response.data
    } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
    }
}

export const getTaskById = async (id) => {
    const response = await api.get(`/tasks/${id}`)
    return response.data
}

export const getTaskLogs = async (id) => {
    const response = await api.get(`/task-logs/${id}`)
    return response.data
}

export const createTask = async ({ title, description, assignedTo, status, priority, dueDate }) => {
    try {
        const response = await api.post('/api/tasks', { title, description, assignedTo, status, priority, dueDate })
        return response.data
    } catch (error) {
        console.error('Error creating task:', error)
        throw error
    }
}

export const updateTask = async (taskId, { title, description, assignedTo, status, priority, dueDate }) => {
    try {
        const response = await api.put(`/api/tasks/${taskId}`, { title, description, assignedTo, status, priority, dueDate })
        return response.data
    } catch (error) {
        console.error('Error updating task:', error)
        throw error
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/api/tasks/${taskId}`)
        return response.data
    } catch (error) {
        console.error('Error deleting task:', error)
        throw error
    }
}
