<template>
    <div class="inline-flex items-center">
        <label
            class="relative flex cursor-pointer items-center"
            htmlFor="custom"
        >
            <input
                id="custom"
                :checked="checked"
                :value="checked"
                class="peer checkbox"
                type="checkbox"
                @click.stop="emit('change')"
            >
            <base-icon
                class="checkbox__mark peer-checked:opacity-100"
                icon="check"
            />
        </label>
    </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/resources/common/ui/BaseIcon.vue';

interface Props {
    checked: boolean
}

defineProps<Props>()
const emit = defineEmits<{
    (e: 'change'): void
}>()
</script>

<style scoped>
.checkbox {
  @apply relative h-[30px] w-[30px] cursor-pointer appearance-none rounded-5 border-[3px] border-gray transition-all checked:border-blue checked:bg-blue
}

.checkbox__mark {
  @apply w-6 h-6 pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity
}
</style>
