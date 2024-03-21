<template>
    <div class="relative">
        <input
            v-model="model"
            :class="fieldErrorClass"
            :name="props.name"
            :placeholder="props.placeholder"
            :type="props.type"
            autocomplete="off"
            class="w-[33rem] rounded-5 border border-gray bg-grayLight px-[1.75rem] py-[1.175rem] text-[1.25rem]"
        />
        <span
            v-if="!!props.error"
            class="absolute bottom-[-2rem] left-[2rem] block text-red"
        >
            {{ props.error }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type?: 'text' | 'password' | 'email'
    placeholder?: string
    name: string
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: '',
})

const model = defineModel<string>({ required: true, default: '' })

const fieldErrorClass = computed(() => ({
    'border-red bg-redLight text-red outline-red placeholder:text-red':
        !!props.error,
}))
</script>
