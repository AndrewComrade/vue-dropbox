<template>
    <BaseContainer>
        <template #default>
            <div class="flex items-center justify-center py-5 text-green-500">
                <RouterLink to="/login">
                    <SiteLogo />
                </RouterLink>
            </div>
        </template>
    </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@/layout/BaseContainer/BaseContainer.vue'
import SiteLogo from '@/components/SiteLogo/SiteLogo.vue'
</script>

<style scoped></style>
