<template>
    <div class="min-h-lvh flex flex-col">
        <header ref="header" class="border-b border-grayLight">
            <slot name="header" />
        </header>
        <main class="flex grow">
            <slot name="content" />
        </main>
    </div>
</template>
