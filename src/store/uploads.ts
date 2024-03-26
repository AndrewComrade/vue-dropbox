import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { uploadsApi } from '@/config/api/uploadsApi.ts'
import { downoaldFile } from '@/helpers/downoaldFile.ts'

export interface Upload {
    id: number
    name: string
    createdAt: number
    editedAt: number
    size: number
    selected: boolean
}

export const useUploadsStore = defineStore('uploads', () => {
    const files = ref<Upload[]>([])

    const selectedFiles = computed(() =>
        files.value.filter((file) => file.selected === true)
    )

    const isAllFilesSelected = computed(
        () => files.value.length === selectedFiles.value.length
    )

    const toggleSelectedById = (id: number) => {
        files.value.map((file) => {
            if (file.id === id) {
                file.selected = !file.selected
            }
        })
    }

    const toggleSelectedAll = (isSelected: boolean) => {
        files.value.map((file) => (file.selected = isSelected))
    }

    const fetchAllFiles = async () => {
        const { data } = await uploadsApi.fetchAllFiles()
        files.value = data.map((item) => ({ ...item, selected: false }))
    }

    const deleteSingleFile = async (filename: string) => {
        await uploadsApi.deleteSingleFile(filename)
        await fetchAllFiles()
    }

    const deleteSelectedFiles = async () => {
        for (const file of selectedFiles.value) {
            await deleteSingleFile(file.name)
        }
        await fetchAllFiles()
    }

    const editSingleFile = async ({
        filename,
        name,
    }: {
        filename: string
        name: string
    }) => {
        await uploadsApi.editSingleFile({ filename, name })
        await fetchAllFiles()
    }

    const downloadSingleFile = async (filename: string) => {
        const { data } = await uploadsApi.downloadSingleFile(filename)
        downoaldFile({ data, filename })
    }

    const downloadSelectedFiles = async () => {
        for (const file of selectedFiles.value) {
            await downloadSingleFile(file.name)
        }
    }

    const uploadSingleFile = async (file: File) => {
        await uploadsApi.uploadSingleFile(file)
    }

    return {
        files,
        selectedFiles,
        isAllFilesSelected,
        fetchAllFiles,
        deleteSingleFile,
        deleteSelectedFiles,
        downloadSingleFile,
        downloadSelectedFiles,
        uploadSingleFile,
        editSingleFile,
        toggleSelectedById,
        toggleSelectedAll,
    }
})
