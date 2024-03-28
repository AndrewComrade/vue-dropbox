<template>
    <base-icon
        :class="icon.colorClass"
        :icon="icon.iconName"
        class="w-8 h-8"
    />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseIcon from '@/resources/common/ui/BaseIcon.vue'

interface Props {
  extension: string
}

interface Extension {
  iconName: string
  colorClass: string
}

const props = defineProps<Props>()

const supportedExtensions = ref<Extension[]>([
    {
        iconName:  'jpeg',
        colorClass: 'text-orange-600'
    },
    {
        iconName:  'png',
        colorClass: 'text-rose-400'
    },
    {
        iconName: 'mp3',
        colorClass: 'text-yellow-500'
    },
    {
        iconName: 'mp4',
        colorClass: 'text-violet-900'
    } ,
    {
        iconName: 'xls',
        colorClass: 'text-green-700'
    },
    {
        iconName: 'docx',
        colorClass: 'text-blue'
    },
    {
        iconName: 'pdf',
        colorClass: 'text-red'
    }
])

const icon = computed(() => {
    return supportedExtensions.value.find((item) => item.iconName === props.extension) || {
        iconName: 'file',
        colorClass: 'text-black'
    }
})
</script>

<style scoped>

</style>
