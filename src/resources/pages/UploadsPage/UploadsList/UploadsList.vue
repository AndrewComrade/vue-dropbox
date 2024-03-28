<template>
    <div
        v-if="uploads.length === 0"
        class="mt-7 text-center text-5xl font-bold"
    >
        Ещё нет ни одного файла
    </div>
    <div v-else>
        <uploads-list-actions />
        <ul>
            <li
                v-for="file in uploads"
                :key="file.id"
            >
                <uploads-list-item v-bind="file" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import UploadsListItem from '@/resources/pages/UploadsPage/UploadsList/components/UploadsListItem/UploadsListItem.vue'
import UploadsListActions from '@/resources/pages/UploadsPage/UploadsList/components/UploadsListActions.vue'

import { type Upload } from '@/store/uploads.ts'

interface Props {
    uploads: Upload[]
}

defineProps<Props>()
</script>

<style scoped></style>
