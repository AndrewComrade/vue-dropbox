<template>
    <BaseContainer>
        <template #default>
            <div
                :class="
                    user.isUserAutorized ? 'justify-between' : 'justify-center'
                "
                class="text-green-500 flex items-center py-5"
            >
                <RouterLink to="/login">
                    <SiteLogo />
                </RouterLink>
                <div
                    v-if="user.isUserAutorized"
                    class="flex cursor-pointer items-center gap-2"
                    @click="logoutUser"
                >
                    <LogoutIcon class="h-[20px] w-[20px]" />
                    <span>Выйти</span>
                </div>
            </div>
        </template>
    </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@/layout/BaseContainer/BaseContainer.vue'
import SiteLogo from '@/components/assets/SiteLogo.vue'
import { useUserStore } from '@/store/user.ts'
import { storeToRefs } from 'pinia'
import LogoutIcon from '@/components/assets/LogoutIcon.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { logoutUser } = userStore
</script>

<style scoped></style>
