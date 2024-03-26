export const humanFileSize = (size: number): string => {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return `${Number((size / Math.pow(1024, i)).toFixed(2)).toLocaleString()} ${['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'][i]}`
}
