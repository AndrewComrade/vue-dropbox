import { api } from '@/config/api'
import { AxiosResponse } from 'axios'

interface LoginUserOptions {
    login: string
    password: string
}

export const userApi = {
    login: async (options: LoginUserOptions): Promise<AxiosResponse<string>> =>
        api.post('/login', options),
}
