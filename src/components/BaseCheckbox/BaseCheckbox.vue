<template>
    <div>
        <input
            :checked="checked"
            :value="checked"
            type="checkbox"
            @click.stop="emit('change')"
        />
    </div>
</template>

<script setup lang="ts">
interface Props {
    checked: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'change'): void
}>()
</script>

<style scoped></style>
