<template>
    <base-container>
        <template #default>
            <div
                :class="
                    user.isUserAutorized ? 'justify-between' : 'justify-center'
                "
                class="flex items-center py-5"
            >
                <router-link
                    class="flex items-center"
                    to="/login"
                >
                    <base-logo class="text-grayDark" />
                </router-link>
                <div
                    v-if="user.isUserAutorized"
                    class="flex cursor-pointer items-center gap-2 hover:text-blue transition-all"
                    @click="logoutUser"
                >
                    <base-icon
                        class="w-5 h-5"
                        icon="logout"
                    />
                    <span>Выйти</span>
                </div>
            </div>
        </template>
    </base-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import BaseContainer from '@/resources/common/ui/BaseContainer.vue'
import BaseIcon from '@/resources/common/ui/BaseIcon.vue';
import BaseLogo from '@/resources/common/ui/BaseLogo.vue';

import { useUserStore } from '@/store/user.ts'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { logoutUser } = userStore
</script>

<style scoped></style>
