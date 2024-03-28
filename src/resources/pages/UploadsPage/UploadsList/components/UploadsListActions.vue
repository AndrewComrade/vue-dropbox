<template>
    <div
        class="relative grid grid-cols-4 gap-x-[3.75rem] border-b-2 border-b-gray p-[1.25rem] text-[1.25rem] font-medium"
    >
        <div
            v-for="(heading, index) in sortOptions"
            :key="heading.key"
            :class="index === 0 && 'col-span-2'"
            class="group flex cursor-pointer items-center gap-2 hover:text-blue"
            @click.stop="setSortKey(heading.key)"
        >
            <span>{{ heading.label }}</span>
            <img
                v-show="heading.key === sortKey"
                :class="heading.key === sortKey && sortOrder === 'desc' && 'rotate-180'"
                :src="arrowIcon"
                alt=""
            >
        </div>
        <base-checkbox
            v-show="selectedFiles.length > 0"
            :checked="isSelected"
            class="absolute -left-[3rem] top-1/2 -translate-y-1/2"
            @change="handleSelectedAll"
        />
    </div>
    <div
        v-show="selectedFiles.length > 0"
        class="my-[1.5rem] flex items-center gap-2"
    >
        <base-button
            variant="blueLight"
            @click.stop="downloadSelectedFiles"
        >
            {{ downloadBtnText }}
        </base-button>
        <base-button
            variant="blueLight"
            @click.stop="deleteSelectedFiles"
        >
            {{ deleteBtnText }}
        </base-button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import arrowIcon from '@/assets/icons/arrow.svg'
import BaseCheckbox from '@/resources/common/ui/BaseCheckbox.vue'
import BaseButton from '@/resources/common/ui/BaseButton.vue'
import { useUploadsStore } from '@/store/uploads.ts'
import { storeToRefs } from 'pinia'
import { useSortStore } from '@/store/sort.ts';

const uploadsStore = useUploadsStore()
const sortStore = useSortStore()

const { isAllFilesSelected, selectedFiles } =
    storeToRefs(uploadsStore)
const { sortOptions, sortKey, sortOrder } = storeToRefs(sortStore)

const {
    toggleSelectedAll,
    deleteSelectedFiles,
    downloadSelectedFiles,
} = useUploadsStore()
const { setSortKey } = useSortStore()

const isSelected = ref(false)

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
