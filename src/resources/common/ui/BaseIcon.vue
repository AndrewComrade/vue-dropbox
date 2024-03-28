<template>
    <div
        class="icon"
        v-html="svg"
    />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  icon: string;
}>();

const svg = ref('');

watch(() => props.icon, (icon: string) => {
    import(`../../../assets/icons/${icon}.svg?raw`).then((module) => {
        if (icon === props.icon) {
            svg.value = module.default;
        }
    });
}, {
    immediate: true,
})
</script>


<style scoped>
.icon {
  @apply inline-flex;

  :deep svg {
    @apply w-full h-full;

    * {
      @apply fill-current;
    }
  }
}
</style>
