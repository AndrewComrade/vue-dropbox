<template>
    <div class="h-[40px] w-[40px]">
        <img
            :src="imageSrc"
            alt="File Icon"
            class="h-full w-full object-contain"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    extension: string
}

const props = withDefaults(defineProps<Props>(), {
    extension: '',
})

const imageSrc = computed(() => `src/assets/extensions/${props.extension}.svg`)
</script>

<style scoped></style>
