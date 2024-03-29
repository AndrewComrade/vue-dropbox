<template>
    <button
        :class="buttonClasses"
        :type="props.type"
        class="button"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type?: 'button' | 'reset' | 'submit'
    variant?: 'blue' | 'blueLight'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    variant: 'blue',
})

const buttonClasses = computed(() => ({
    'bg-blue text-white hover:bg-blueLight hover:text-blue':
        props.variant === 'blue',
    'bg-blueLight text-blue hover:bg-blue hover:text-white':
        props.variant === 'blueLight',
}))
</script>

<style scoped>
.button {
  @apply flex items-center justify-center rounded-7 px-[1rem] py-[0.75rem] font-medium transition-all
}
</style>
