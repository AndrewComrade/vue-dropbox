import { defineStore } from 'pinia'
import { ref } from 'vue'

type NotificationVariant = 'primary' | 'success' | 'error'

export const useNotificationStore = defineStore('notification', () => {
    const isOpen = ref(false)
    const message = ref('')
    const variant = ref<NotificationVariant>('primary')
    const delay = ref(3000)

    const showHotification = (payload: {
        message: string
        variant: NotificationVariant
        delay?: number
    }) => {
        isOpen.value = true
        message.value = payload.message
        variant.value = payload.variant

        setTimeout(() => hideNotification(), delay.value)
    }

    const hideNotification = () => {
        isOpen.value = false
        message.value = ''
    }

    return {
        isOpen,
        message,
        variant,
        showHotification,
        hideNotification,
    }
})
