import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { uploadsApi } from '@/config/api/uploadsApi.ts'
import { downoaldFile } from '@/helpers/downoaldFile.ts'
import { useNotificationStore } from '@/store/notification.ts'
import { sortByKey } from '@/helpers/sortByKey.ts';
import { useSortStore } from '@/store/sort.ts';
import { AxiosResponse } from 'axios';

export interface Upload {
    id: number
    name: string
    createdAt: number
    editedAt: number
    size: number
    selected: boolean
}

export const useUploadsStore = defineStore('uploads', () => {
    const sortStore = useSortStore()
    const { sortKey, sortOrder } = storeToRefs(sortStore)

    const { showHotification } = useNotificationStore()

    const files = ref<Upload[]>([])

    const selectedFiles = computed(() =>
        files.value.filter((file) => file.selected === true)
    )

    const isAllFilesSelected = computed(
        () => files.value.length === selectedFiles.value.length
    )

    const toggleSelectedById = (id: number) => {
        const selectedFile = files.value.find(file => file.id === id)

        if (!selectedFile) return

        selectedFile.selected = !selectedFile.selected
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
    ) => {
        try {
            await uploadsApi.deleteSingleFile(filename)
            await fetchAllFiles()

            showHotification({
                message: `Файл ${filename} успешно удалён`,
                variant: 'success',
            })

        } catch {
            showHotification({
                message: `Не удалось удалить ${filename}`,
                variant: 'error',
            })
        }
    }

    const deleteSelectedFiles = async () => {
        const requests: Promise<AxiosResponse>[] = []

        for await (const file of selectedFiles.value) {
            requests.push(uploadsApi.deleteSingleFile(file.name))
        }

        try {
            await Promise.all(requests)
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
    ) => {
        try {
            const { data } = await uploadsApi.downloadSingleFile(filename)
            downoaldFile({ data, filename })
            showHotification({
                message: `Файл ${filename} успешно скачан`,
                variant: 'success',
            })
        } catch {
            showHotification({
                message: `Файл ${filename} не удалось скачать`,
                variant: 'error',
            })
        }
    }

    const downloadSelectedFiles = async () => {
        const requests: Promise<AxiosResponse<Blob>>[] = []

        for (const file of selectedFiles.value) {
            requests.push(uploadsApi.downloadSingleFile(file.name))
        }

        try {
            const values = await Promise.all(requests)

            for (const { data, config } of values) {
                // config.params.filename - костыль для получения имени скачиваемого файла
                downoaldFile({ data, filename: config.params.filename })
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

    const uploadFiles = async (files: FileList) => {
        const requests: Promise<AxiosResponse>[] = []

        for (const file of files) {
            requests.push(uploadsApi.uploadSingleFile(file))
        }

        try {
            await Promise.all(requests)
            await fetchAllFiles()
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

    watchEffect(() => {
        sortByKey(files.value, sortKey.value, sortOrder.value)
    })

    return {
        files,
        selectedFiles,
        isAllFilesSelected,
        fetchAllFiles,
        deleteSingleFile,
        deleteSelectedFiles,
        downloadSingleFile,
        downloadSelectedFiles,
        uploadFiles,
        editSingleFile,
        toggleSelectedById,
        toggleSelectedAll,
    }
})
