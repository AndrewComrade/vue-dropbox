import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { userApi } from '@/config/api/userApi.ts'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { RouterNames, RouterPaths } from '@/config/routing/routes.ts'

interface UserState {
    login: string
    password: string
    token: string
    loginErrors: string[]
    passwordErrors: string[]
}

interface ErrorsResponse {
    login: string[]
    password: string[]
}

export const useUserStore = defineStore('user', () => {
    const router = useRouter()

    const isUserAutorized = computed(
        () => !!user.token || !!localStorage.getItem('token')
    )

    const loginError = computed(() => user.loginErrors)
    const passwordError = computed(() => user.passwordErrors)

    const user: UserState = reactive({
        login: '',
        password: '',
        token: '',
        loginErrors: [],
        passwordErrors: [],
    })

    const loginUser = async ({
        login,
        password,
    }: {
        login: string
        password: string
    }) => {
        try {
            const { data: token } = await userApi.login({
                login: login.trim(),
                password: password.trim(),
            })

            localStorage.setItem('token', token)

            user.login = login
            user.password = password
            user.token = token

            await router.push({ path: RouterPaths.UPLOADS })
        } catch (error) {
            if (axios.isAxiosError<ErrorsResponse>(error) && error.response) {
                const { data } = error.response
                const { login: loginErrors, password: passwordErrors } = data
                user.loginErrors = loginErrors
                user.passwordErrors = passwordErrors
            }
        }
    }

    const logoutUser = async () => {
        user.login = ''
        user.password = ''
        user.token = ''

        localStorage.removeItem('token')
        await router.push({ name: RouterNames.LOGIN })
    }

    return {
        user,
        isUserAutorized,
        loginError,
        passwordError,
        loginUser,
        logoutUser,
    }
})
