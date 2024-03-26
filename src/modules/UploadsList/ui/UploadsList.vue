<template>
    <div>
        <UploadsListActions />
        <ul>
            <li v-for="file in props.uploads" :key="file.id">
                <UploadsListItem v-bind="file" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import UploadsListItem from '@/modules/UploadsList/ui/UploadsListItem.vue'
import UploadsListActions from '@/modules/UploadsList/ui/UploadsListActions.vue'
import { Upload } from '@/store/uploads.ts'
import { onMounted } from 'vue'

onMounted(async () => {})

interface Props {
    uploads: Upload[]
}

const props = defineProps<Props>()
</script>

<style scoped></style>
