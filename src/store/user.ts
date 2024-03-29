import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { userApi } from '@/config/api/userApi.ts'
import { RouterNames, RouterPaths } from '@/config/routing/routes.ts'

interface UserState {
    login: string
    password: string
    token: string
}

interface ErrorsResponse {
    login: string[]
    password: string[]
}

export const useUserStore = defineStore('user', () => {
    const router = useRouter()

    const user: UserState = reactive({
        login: '',
        password: '',
        token: '',
    })

    const loginErrors = ref<string[]>([])
    const passwordErrors = ref<string[]>([])
    const isUserAutorized = ref(!!localStorage.getItem('token'))

    const loginUser = async ({
        login,
        password,
    }: {
        login: string
        password: string
    }) => {
        try {
            const { data: token } = await userApi.login({
                login,
                password
            })

            localStorage.setItem('token', token)

            user.login = login
            user.password = password
            user.token = token
            isUserAutorized.value = true

            await router.push({ path: RouterPaths.UPLOADS })
        } catch (error) {
            if (axios.isAxiosError<ErrorsResponse>(error) && error.response) {
                const { data } = error.response
                const { login, password } = data
                loginErrors.value = login
                passwordErrors.value = password
            }
        }
    }

    const logoutUser = async () => {
        user.login = ''
        user.password = ''
        user.token = ''
        isUserAutorized.value = false

        localStorage.removeItem('token')
        await router.push({ name: RouterNames.LOGIN })
    }

    return {
        user,
        loginErrors,
        passwordErrors,
        isUserAutorized,
        loginUser,
        logoutUser,
    }
})
