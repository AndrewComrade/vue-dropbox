export const downoaldFile = ({
    data,
    filename,
}: {
    data: Blob
    filename: string
}) => {
    const href = URL.createObjectURL(data)

    const link = document.createElement('a')
    link.href = href
    link.setAttribute('download', filename)
    document.body.append(link)
    link.click()

    link.remove()
    URL.revokeObjectURL(href)
}
