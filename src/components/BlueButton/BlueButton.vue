<template>
    <button
        :type="props.type"
        class="flex items-center justify-center bg-blue text-white rounded-7"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
// TODO: Уточнить про .prop, .attr. Уточнить прокидывание и типизация html атрибутов
interface Props {
    type?: 'button' | 'reset' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'button',
})
</script>

<style scoped></style>
