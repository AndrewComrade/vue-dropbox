<template>
    <button
        :class="buttonClasses"
        :type="props.type"
        class="flex items-center justify-center rounded-7 px-[1rem] py-[0.75rem] font-medium"
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

const buttonClasses = computed(() => {
    switch (props.variant) {
        case 'blue':
            return 'bg-blue text-white'
        case 'blueLight':
            return 'bg-blueLight text-blue'
    }
})
</script>

<style scoped></style>
