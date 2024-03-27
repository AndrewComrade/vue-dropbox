<template>
    <Teleport to="body">
        <Transition name="notification">
            <div
                v-show="isOpen"
                class="fixed bottom-3 left-0 right-0 z-10 flex justify-center"
            >
                <div
                    :class="classObject"
                    class="bg-secondaryBlack flex min-w-[400px] items-center justify-center gap-3 rounded-[2px] border-b-[5px] border-blue px-5 py-4 text-center text-[1.5rem] text-white"
                >
                    <span> {{ message }}</span>
                    <div v-if="variant === 'success'">
                        <img :src="successIcon" alt="" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import successIcon from '@/assets/success.svg'
import { useNotificationStore } from '@/store/notification.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useNotificationStore()
const { isOpen, variant, message } = storeToRefs(store)

const classObject = computed(() => ({
    'bg-redLight text-red border-red': variant.value === 'error',
}))
</script>

<style scoped></style>
