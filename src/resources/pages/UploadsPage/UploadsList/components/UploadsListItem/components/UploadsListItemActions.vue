<template>
    <div class="flex items-center gap-2">
        <button
            class="h-[30px] w-[30px] shrink-0 hover:text-blue transition-all"
            @click.stop.prevent="emit('edit')"
        >
            <base-icon icon="edit" />
        </button>
        <button
            class="h-[30px] w-[30px] shrink-0 hover:text-blue transition-all"
            @click.stop.prevent="emit('download')"
        >
            <base-icon icon="download" />
        </button>
        <button
            class="h-[30px] w-[30px] shrink-0 hover:text-blue transition-all"
            @click.stop.prevent="emit('delete')"
        >
            <base-icon icon="delete" />
        </button>
    </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/resources/common/ui/BaseIcon.vue';

const emit = defineEmits<{
    (e: 'download'): void
    (e: 'edit'): void
    (e: 'delete'): void
}>()
</script>

<style scoped></style>
