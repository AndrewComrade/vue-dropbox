<template>
    <div
        class="relative grid grid-cols-4 gap-x-[3.75rem] border-b-2 border-b-gray p-[1.25rem] text-[1.25rem] font-medium"
    >
        <div
            v-for="(heading, index) in headings"
            :key="heading"
            :class="index === 0 && 'col-span-2'"
            class="flex items-center gap-2"
        >
            <span>{{ heading }}</span>
            <img :src="arrowIcon" alt="" />
        </div>
        <BaseCheckbox
            v-show="selectedFiles.length > 0"
            :checked="isSelected"
            class="absolute -left-[1rem] top-1/2 -translate-y-1/2"
            @change="handleSelectedAll"
        />
    </div>
    <div
        v-show="selectedFiles.length > 0"
        class="my-[1.5rem] flex items-center gap-2"
    >
        <BaseButton variant="blueLight" @click.stop="downloadSelectedFiles">
            {{ downloadBtnText }}
        </BaseButton>
        <BaseButton variant="blueLight" @click.stop="deleteSelectedFiles">
            {{ deleteBtnText }}
        </BaseButton>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import arrowIcon from '@/assets/arrow.svg'
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { useUploadsStore } from '@/store/uploads.ts'
import { storeToRefs } from 'pinia'

const store = useUploadsStore()
const { isAllFilesSelected, selectedFiles } = storeToRefs(store)
const { toggleSelectedAll, deleteSelectedFiles, downloadSelectedFiles } =
    useUploadsStore()

const isSelected = ref(false)
const headings = ref(['Название', 'Дата изменения', 'Размер'])

const downloadBtnText = computed(() =>
    isAllFilesSelected.value ? 'Скачать все' : 'Скачать выбраные'
)

const deleteBtnText = computed(() =>
    isAllFilesSelected.value ? 'Удалить все' : 'Удалить выбраные'
)

const handleSelectedAll = () => {
    isSelected.value = !isSelected.value
    toggleSelectedAll(isSelected.value)
}

watch(isAllFilesSelected, (value) => {
    isSelected.value = value
})
</script>

<style scoped></style>
