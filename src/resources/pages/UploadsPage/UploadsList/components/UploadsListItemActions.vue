<template>
    <div class="flex items-center gap-2">
        <button
            class="h-[30px] w-[30px] shrink-0"
            @click.stop.prevent="emit('edit')"
        >
            <img
                :src="editIcon"
                alt=""
            >
        </button>
        <button
            class="h-[30px] w-[30px] shrink-0"
            @click.stop.prevent="emit('download')"
        >
            <img
                :src="downloadIcon"
                alt=""
            >
        </button>
        <button
            class="h-[30px] w-[30px] shrink-0"
            @click.stop.prevent="emit('delete')"
        >
            <img
                :src="deleteIcon"
                alt=""
            >
        </button>
    </div>
</template>

<script setup lang="ts">
import downloadIcon from '@/assets/icons/download.svg'
import editIcon from '@/assets/icons/edit.svg'
import deleteIcon from '@/assets/icons/delete.svg'

const emit = defineEmits<{
    (e: 'download'): void
    (e: 'edit'): void
    (e: 'delete'): void
}>()
</script>

<style scoped></style>
