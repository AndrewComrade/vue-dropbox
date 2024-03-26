import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
    config.headers['auth-token'] = `Bearer ${localStorage.getItem('token')}`

    return config
})
