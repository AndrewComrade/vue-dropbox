import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import LoginPage from '@/pages/LoginPage/LoginPage.vue'
import UploadsPage from '@/pages/UploadsPage/UploadsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.vue'
import { useUserStore } from '@/store/user.ts'

export enum RouterPaths {
    LOGIN = '/login',
    UPLOADS = '/uploads',
}

export enum RouterNames {
    LOGIN = 'Login',
    UPLOADS = 'Uploads',
}

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: RouterPaths.LOGIN,
    },
    {
        name: RouterNames.LOGIN,
        path: RouterPaths.LOGIN,
        component: LoginPage,
    },
    {
        name: RouterNames.UPLOADS,
        path: RouterPaths.UPLOADS,
        component: UploadsPage,
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guards

router.beforeEach(async (to) => {
    const { user } = useUserStore()

    // Скрываем все роуты, кроме login, если не авторизован
    if (!user.isUserAutorized && to.name !== RouterNames.LOGIN) {
        return { name: RouterNames.LOGIN }
    }

    // Скрываем login, если авторизирован
    if (user.isUserAutorized && to.name === RouterNames.LOGIN) {
        return { name: RouterNames.UPLOADS }
    }
})
