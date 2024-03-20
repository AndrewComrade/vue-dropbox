<template>
    <BaseContainer class="min-h-full justify-center">
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
        <LoginForm />
    </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@/layout/BaseContainer/BaseContainer.vue'
import LoginForm from '@/modules/LoginForm/ui/LoginForm.vue'
</script>

<style scoped></style>
