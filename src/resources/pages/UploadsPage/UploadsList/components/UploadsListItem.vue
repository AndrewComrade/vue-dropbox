<template>
    <div
        :class="classObject"
        class="relative grid cursor-pointer grid-cols-4 gap-x-[3.75rem] border-b border-b-grayLight p-[1.25rem] text-[1.5rem]"
        @click.stop="toggleSelected"
    >
        <base-checkbox
            :checked="selected"
            class="absolute -left-[3rem] top-1/2 -translate-y-1/2"
            @change="toggleSelected"
        />
        <uploads-list-item-actions
            v-show="selected"
            :filename="name"
            class="absolute right-[1rem] top-1/2 -translate-y-1/2"
            @delete="handleDelete"
            @download="handleDownload"
            @edit="handleEdit"
        />
        <div class="col-span-2 flex items-center">
            <file-extension-icon
                :extension="fileExtension"
                class="mr-2 shrink-0"
            />
            <span
                :title="`${filename}.${fileExtension}`"
                class="truncate"
            >{{ filename }}</span>
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
import FileExtensionIcon from '@/resources/common/ui/FileExtensionIcon.vue'
import BaseCheckbox from '@/resources/common/ui/BaseCheckbox.vue'
import UploadsListItemActions from '@/resources/pages/UploadsPage/UploadsList/components/UploadsListItemActions.vue'
import { useUploadsStore } from '@/store/uploads.ts'

interface Props {
    id: number
    name: string
    createdAt: number
    editedAt: number
    size: number
    selected: boolean
}

const props = defineProps<Props>()

const {
    deleteSingleFile,
    editSingleFile,
    downloadSingleFile,
    toggleSelectedById,
} = useUploadsStore()

const classObject = computed(() => ({
    'bg-blueLight': props.selected,
    'hover:bg-grayLight': !props.selected,
}))

const formatedFileSize = computed(() => humanFileSize(props.size))
const filename = computed(() => props.name.split('.').shift())
const fileExtension = computed(() => getExtension(props.name))
const formatedEditedAt = computed(() =>
    format(new Date(props.editedAt), 'dd.MM.yyyy, HH:mm')
)

const toggleSelected = () => {
    toggleSelectedById(props.id)
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
