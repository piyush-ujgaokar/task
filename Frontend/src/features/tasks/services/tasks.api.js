import axios from 'axios'

const api = axios.create({
    baseURL: 'https://task-6gbp.onrender.com',
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
    const response = await api.get(`/api/tasks/${id}`)
    return response.data
}

export const getTaskLogs = async (id) => {
    const response = await api.get(`/api/task-logs/${id}`)
    return response.data
}

export const createTask = async ({ title, description, assignedTo, status, priority, dueDate }) => {
    try {
        // backend expects `assignTo` and `assignBy` fields; map `assignedTo` -> `assignTo`
        const payload = { title, description, assignTo: assignedTo, status, priority, dueDate }
        const response = await api.post('/api/tasks', payload)
        return response.data
    } catch (error) {
        console.error('Error creating task:', error)
        throw error
    }
}

export const updateTask = async (taskId, { title, description, assignedTo, status, priority, dueDate }) => {
    try {
        const payload = { title, description, status, priority, dueDate }
        if (assignedTo) payload.assignTo = assignedTo
        const response = await api.patch(`/api/tasks/${taskId}`, payload)
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
