export const sortByKey = <T, K extends keyof T>(arr: T[], key: K, direction: 'asc' | 'desc'): T[] => {
    const multiplier = direction === 'asc' ? 1 : -1
    return arr.sort((a, b) => {
        if  (typeof a[key] === 'number') {
            return (Number(a[key]) - Number(b[key])) * multiplier
        }
        if  (typeof a[key] === 'string') {
            return String(a[key]).localeCompare(String(b[key])) * multiplier
        }
        return 0
    })
}
