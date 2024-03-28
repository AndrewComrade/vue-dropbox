<script setup lang="ts">
import BaseLayout from '@/resources/common/ui/BaseLayout.vue'
import BaseHeader from '@/resources/common/ui/BaseHeader.vue'
import BaseNotification from '@/resources/common/ui/BaseNotification.vue'
</script>

<template>
    <base-layout>
        <template #header>
            <base-header />
        </template>
        <template #content>
            <suspense>
                <router-view />
            </suspense>
        </template>
    </base-layout>
    <base-notification />
</template>
