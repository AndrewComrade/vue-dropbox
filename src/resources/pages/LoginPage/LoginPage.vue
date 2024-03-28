<template>
    <base-container class="min-h-full justify-center">
        <div class="mx-auto text-center">
            <h1 class="text-[4rem] font-bold mb-[3.5rem] leading-[1.12]">
                Облачное хранилище
            </h1>
            <p
                class="mx-auto mb-[4rem] font-light text-[1.5rem] text-center max-w-[35rem] leading-[1.17]"
            >
                Введите свою почту и пароль, чтобы начать работу в облачном
                хранилище
            </p>
        </div>
        <login-form />
    </base-container>
</template>

<script setup lang="ts">
import BaseContainer from '@/resources/common/ui/BaseContainer.vue'
import LoginForm from '@/resources/pages/LoginPage/LoginForm/LoginForm.vue'
</script>

<style scoped></style>
