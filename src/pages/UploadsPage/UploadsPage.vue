<template>
    <BaseContainer class="py-[4rem]">
        <h1 class="text-[2.25rem] font-bold">Ваши файлы</h1>
        <label for="upload-photo">
            <BaseButton
                class="mt-[1.75rem] w-[7.5rem] py-1"
                variant="blue"
                @click.stop.prevent="openFileInput"
            >
                Добавить
            </BaseButton>
            <input
                id="uploadFiles"
                ref="fileInput"
                class="hidden"
                name="files"
                type="file"
                multiple
                @change="handleUploadFile"
            />
        </label>

        <UploadsList :uploads="files" />
    </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@/layout/BaseContainer/BaseContainer.vue'
import UploadsList from '@/modules/UploadsList/ui/UploadsList.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import { onMounted, ref } from 'vue'
import { useUploadsStore } from '@/store/uploads.ts'
import { storeToRefs } from 'pinia'

const store = useUploadsStore()
const { files } = storeToRefs(store)
const { fetchAllFiles, uploadSingleFile } = useUploadsStore()

const fileInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
    fetchAllFiles()
})

const openFileInput = () => {
    fileInput.value?.click()
}
const handleUploadFile = async (event: Event) => {
    const { files } = event.target as HTMLInputElement

    if (!files || files.length === 0) return

    for (let file of files) {
        await uploadSingleFile(file)
    }

    await fetchAllFiles()
}
</script>

<style scoped></style>
