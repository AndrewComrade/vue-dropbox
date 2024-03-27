<template>
    <div
        :class="selected && 'bg-blueLight'"
        class="relative grid grid-cols-4 gap-x-[3.75rem] border-b border-b-grayLight p-[1.25rem] text-[1.5rem]"
        @click.stop="toggleSelected"
    >
        <BaseCheckbox
            :checked="selected"
            class="absolute -left-[3rem] top-1/2 -translate-y-1/2"
            @change="toggleSelected"
        />
        <UploadsListItemActions
            v-show="selected"
            :filename="name"
            class="absolute right-[1rem] top-1/2 -translate-y-1/2"
            @delete="handleDelete"
            @download="handleDownload"
            @edit="handleEdit"
        />
        <div class="col-span-2 flex items-center">
            <FileExtensionIcon
                :extension="fileExtension"
                class="mr-2 shrink-0"
            />
            <span class="truncate">{{ filename }}</span>
            <span v-if="fileExtension">.{{ fileExtension }}</span>
        </div>
        <div class="flex items-center">
            {{ formatedEditedAt }}
        </div>
        <div class="flex items-center">
            {{ formatedFileSize }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { humanFileSize } from '@/helpers/humanFileSize.ts'
import { format } from 'date-fns'
import { getExtension } from '@/helpers/getExtension.ts'
import FileExtensionIcon from '@/components/FileExtensionIcon/FileExtensionIcon.vue'
import BaseCheckbox from '@/components/BaseCheckbox/BaseCheckbox.vue'
import UploadsListItemActions from '@/modules/UploadsList/ui/UploadsListItemActions.vue'
import { useUploadsStore } from '@/store/uploads.ts'
import { storeToRefs } from 'pinia'

interface Props {
    id: number
    name: string
    createdAt: number
    editedAt: number
    size: number
    selected: boolean
}

const props = defineProps<Props>()

const store = useUploadsStore()
const { selectedFiles } = storeToRefs(store)
const {
    deleteSingleFile,
    editSingleFile,
    downloadSingleFile,
    toggleSelectedById,
} = useUploadsStore()

const formatedFileSize = computed(() => humanFileSize(props.size))
const filename = computed(() => props.name.split('.').shift())
const fileExtension = computed(() => getExtension(props.name))
const formatedEditedAt = computed(() =>
    format(new Date(props.editedAt), 'dd.MM.yyyy, HH:mm')
)

const toggleSelected = () => {
    toggleSelectedById(props.id)
    console.log(selectedFiles.value)
}

const handleDownload = () => {
    downloadSingleFile(props.name)
}

const handleEdit = async () => {
    const name = prompt(`Введите новое название файла для ${props.name}`)

    if (!name) return

    await editSingleFile({
        filename: props.name,
        name: `${name}.${fileExtension.value}`,
    })
}

const handleDelete = () => {
    const isDeleteConfirmed = confirm(`Вы точно хотите удалить ${props.name}?`)

    if (!isDeleteConfirmed) return

    deleteSingleFile(props.name)
}
</script>

<style scoped></style>
