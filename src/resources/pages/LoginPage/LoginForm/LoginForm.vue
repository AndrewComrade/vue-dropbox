<template>
    <form
        class="flex flex-col items-center"
        novalidate
        @submit.prevent="onSubmit"
    >
        <fieldset class="mb-[2.5rem]">
            <login-form-input
                v-model.trim="login"
                :error="errors.login"
                name="login"
                placeholder="Введите вашу почту"
                type="text"
            />
        </fieldset>
        <fieldset class="mb-[4rem]">
            <login-form-input
                v-model.trim="password"
                :error="errors.password"
                name="password"
                placeholder="Введите ваш пароль"
                type="text"
            />
        </fieldset>
        <base-button
            class="h-[4.25rem] w-[11rem] text-[1.5rem]"
            type="submit"
        >
            Войти
        </base-button>
    </form>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'

import LoginFormInput from '@/resources/pages/LoginPage/LoginForm/components/LoginFormInput.vue'
import BaseButton from '@/resources/common/ui/BaseButton.vue'

import { useUserStore } from '@/store/user.ts'

const userStore = useUserStore()
const { loginErrors, passwordErrors } = storeToRefs(userStore)
const { loginUser } = userStore

const validationSchema = toTypedSchema(
    z.object({
        login: z.string().min(1, { message: 'Необходимо ввести почту' }),
        password: z.string().min(1, { message: 'Необходимо ввести пароль' }),
    })
)

const { handleSubmit, errors } = useForm({
    validationSchema,
})

watch(loginErrors, (value) => {
    if (value.length > 0) {
        setLoginError(value[0])
    }
})

watch(passwordErrors, (value) => {
    if (value.length > 0) {
        setPasswordError(value[0])
    }
})

const { value: login, setErrors: setLoginError } = useField<string>('login')
const { value: password, setErrors: setPasswordError } =
    useField<string>('password')

const onSubmit = handleSubmit((values) => {
    loginUser(values)
})
</script>
