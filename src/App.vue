<script setup lang="ts">
import BaseLayout from '@/layout/BaseLayout/BaseLayout.vue'
import BaseHeader from '@/layout/BaseHeader/BaseHeader.vue'
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
</template>
