<script setup lang="ts">
import BaseLayout from '@/layout/BaseLayout/BaseLayout.vue'
import BaseHeader from '@/layout/BaseHeader/BaseHeader.vue'
import BaseNotification from '@/components/BaseNotification/BaseNotification.vue'
</script>

<template>
    <BaseLayout>
        <template #header>
            <BaseHeader />
        </template>
        <template #content>
            <Suspense>
                <RouterView />
            </Suspense>
        </template>
    </BaseLayout>
    <BaseNotification />
</template>
