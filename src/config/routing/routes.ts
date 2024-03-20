import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import LoginPage from '@/pages/LoginPage/LoginPage.vue'
import UploadsPage from '@/pages/UploadsPage/UploadsPage.vue'

export enum RoutesPaths {
    LOGIN = '/login',
    UPLOADS = '/uploads',
}

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: RoutesPaths.LOGIN,
    },
    {
        path: RoutesPaths.LOGIN,
        component: LoginPage,
    },
    {
        path: RoutesPaths.UPLOADS,
        component: UploadsPage,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
