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
            <RouterView />
        </template>
    </BaseLayout>
</template>
