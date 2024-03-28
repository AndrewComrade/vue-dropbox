<template>
    <Teleport to="body">
        <Transition name="notification">
            <div
                v-if="isOpen"
                class="fixed bottom-3 left-0 right-0 z-10 flex justify-center"
            >
                <div
                    :class="classObject"
                    class="flex min-w-[400px] items-center justify-center gap-3 rounded-[2px] border-b-[5px] px-5 py-4 text-center text-[1.5rem]"
                >
                    <span> {{ message }}</span>
                    <base-icon
                        v-show="variant === 'success'"
                        class="text-white w-6 h-6"
                        icon="success"
                    />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import BaseIcon from '@/resources/common/ui/BaseIcon.vue';

import { useNotificationStore } from '@/store/notification.ts'

const store = useNotificationStore()
const { isOpen, variant, message } = storeToRefs(store)

const classObject = computed(() => ({
    'bg-redLight text-red border-red': variant.value === 'error',
    'bg-secondaryBlack text-white border-blue ': variant.value !== 'error',
}))
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
}
</style>
