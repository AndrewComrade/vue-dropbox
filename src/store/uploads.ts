import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { uploadsApi } from '@/config/api/uploadsApi.ts'
import { downoaldFile } from '@/helpers/downoaldFile.ts'
import { useNotificationStore } from '@/store/notification.ts'

export interface Upload {
    id: number
    name: string
    createdAt: number
    editedAt: number
    size: number
    selected: boolean
}

export const useUploadsStore = defineStore('uploads', () => {
    const { showHotification } = useNotificationStore()

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

    const deleteSingleFile = async (
        filename: string,
        showNotification: boolean = true
    ) => {
        try {
            await uploadsApi.deleteSingleFile(filename)
            await fetchAllFiles()

            if (showNotification) {
                showHotification({
                    message: `Файл ${filename} успешно удалён`,
                    variant: 'success',
                })
            }
        } catch {
            showHotification({
                message: `Не удалось удалить ${filename}`,
                variant: 'error',
            })
        }
    }

    const deleteSelectedFiles = async () => {
        try {
            for (const file of selectedFiles.value) {
                await deleteSingleFile(file.name, false)
            }
            await fetchAllFiles()
            showHotification({
                message: 'Файлы успешно удалёны',
                variant: 'success',
            })
        } catch {
            showHotification({
                message: 'Не удалось удалить файлы',
                variant: 'error',
            })
        }
    }

    const editSingleFile = async ({
        filename,
        name,
    }: {
        filename: string
        name: string
    }) => {
        try {
            await uploadsApi.editSingleFile({ filename, name })
            await fetchAllFiles()
            showHotification({
                message: `Файл ${filename} успешно переименован`,
                variant: 'success',
            })
        } catch {
            showHotification({
                message: `Файл ${filename} не удалось переименовать`,
                variant: 'error',
            })
        }
    }

    const downloadSingleFile = async (
        filename: string,
        showNotification: boolean = true
    ) => {
        try {
            const { data } = await uploadsApi.downloadSingleFile(filename)
            downoaldFile({ data, filename })
            if (showNotification) {
                showHotification({
                    message: `Файл ${filename} успешно скачан`,
                    variant: 'success',
                })
            }
        } catch {
            showHotification({
                message: `Файл ${filename} не удалось скачать`,
                variant: 'error',
            })
        }
    }

    const downloadSelectedFiles = async () => {
        try {
            for (const file of selectedFiles.value) {
                await downloadSingleFile(file.name, false)
            }
            showHotification({
                message: 'Файлы успешно скачаны',
                variant: 'success',
            })
        } catch {
            showHotification({
                message: 'Файлы не удалось скачать',
                variant: 'error',
            })
        }
    }

    const uploadSingleFile = async (file: File) => {
        try {
            await uploadsApi.uploadSingleFile(file)
            showHotification({
                message: 'Файлы успешно загружены',
                variant: 'success',
            })
        } catch {
            showHotification({
                message: 'Файлы не удалось загрузить',
                variant: 'error',
            })
        }
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
