<template>
    <form
        class="flex flex-col items-center"
        novalidate
        @submit.prevent="onSubmit"
    >
        <fieldset class="mb-[2.5rem]">
            <LoginFormInput
                v-model="login"
                :error="errors.login"
                name="login"
                placeholder="Введите вашу почту"
                type="text"
            />
        </fieldset>
        <fieldset class="mb-[4rem]">
            <LoginFormInput
                v-model="password"
                :error="errors.password"
                name="password"
                placeholder="Введите ваш пароль"
                type="text"
            />
        </fieldset>
        <BlueButton class="h-[4.25rem] w-[11rem] text-[1.5rem]" type="submit">
            Войти
        </BlueButton>
    </form>
</template>

<script setup lang="ts">
import LoginFormInput from '@/modules/LoginForm/ui/LoginFormInput.vue'
import BlueButton from '@/components/BlueButton/BlueButton.vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user.ts'
import { watch } from 'vue'

const userStore = useUserStore()
const { loginError, passwordError } = storeToRefs(userStore)
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

watch(loginError, (value) => {
    if (value.length > 0) {
        setLoginError(value[0])
    }
})

watch(passwordError, (value) => {
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
