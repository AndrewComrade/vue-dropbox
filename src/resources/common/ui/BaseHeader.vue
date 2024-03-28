<template>
    <base-container>
        <template #default>
            <div
                :class="
                    user.isUserAutorized ? 'justify-between' : 'justify-center'
                "
                class="text-green-500 flex items-center py-5"
            >
                <router-link to="/login">
                    <site-logo />
                </router-link>
                <div
                    v-if="user.isUserAutorized"
                    class="flex cursor-pointer items-center gap-2"
                    @click="logoutUser"
                >
                    <logout-icon class="stroke-blue" />
                    <span>Выйти</span>
                </div>
            </div>
        </template>
    </base-container>
</template>

<script setup lang="ts">
import BaseContainer from '@/resources/common/ui/BaseContainer.vue'
import SiteLogo from '@/components/assComp/SiteLogo.vue'
import { useUserStore } from '@/store/user.ts'
import { storeToRefs } from 'pinia'

import LogoutIcon from '@icons/logout.svg'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { logoutUser } = userStore
</script>

<style scoped></style>
