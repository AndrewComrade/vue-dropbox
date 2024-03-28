<template>
    <base-container class="py-[4rem]">
        <h1 class="text-[2.25rem] font-bold">
            Ваши файлы
        </h1>
        <label for="upload-photo">
            <base-button
                class="mt-[1.75rem] w-[7.5rem] py-1"
                variant="blue"
                @click.stop.prevent="openFileInput"
            >
                Добавить
            </base-button>
            <input
                id="uploadFiles"
                ref="fileInput"
                class="hidden"
                name="files"
                type="file"
                multiple
                @change="handleUploadFile"
            >
        </label>

        <uploads-list :uploads="files" />
    </base-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import BaseContainer from '@/resources/common/ui/BaseContainer.vue'
import UploadsList from '@/resources/pages/UploadsPage/UploadsList/UploadsList.vue'
import BaseButton from '@/resources/common/ui/BaseButton.vue'

import { useUploadsStore } from '@/store/uploads.ts'

const store = useUploadsStore()
const { files } = storeToRefs(store)
const { fetchAllFiles, uploadFiles } = useUploadsStore()

const fileInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
    fetchAllFiles()
})

const openFileInput = () => {
    fileInput.value?.click()
}
const handleUploadFile = (event: Event) => {
    const { files } = event.target as HTMLInputElement

    if (!files || files.length === 0) return
    uploadFiles(files)
}
</script>

<style scoped></style>
