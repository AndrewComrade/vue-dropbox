import { defineStore } from 'pinia';
import { computed, ComputedRef, ref } from 'vue';
import { Upload } from '@/store/uploads.ts';


type Order = 'asc' | 'desc'
type SortKey = keyof Upload

interface SortOption {
    label: string
    key: SortKey
}


export const useSortStore = defineStore('sort', () => {
    const sortKey = ref<SortKey>('name')
    const sortOrder = ref<Order>('asc')

    const sortOptions: ComputedRef<SortOption[]> = computed(() => [
        {
            label: 'Название',
            key: 'name',
        },
        {
            label: 'Дата изменения',
            key: 'editedAt',
        },
        {
            label: 'Размер',
            key: 'size',
        },
    ])

    const setSortKey = (key: SortKey) => {
        if (sortKey.value === key) {
            toggleSortOrder()
        } else {
            sortKey.value = key
            sortOrder.value = 'asc'
        }
    }

    const toggleSortOrder = () => {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    }

    return {
        sortOptions,
        sortOrder,
        sortKey,
        setSortKey,
        toggleSortOrder,
    }
})
