export const getExtension = (path: string): string => {
    const basename = path.split(/[/\\]/).pop()
    const pos = basename?.lastIndexOf('.')

    if (!basename || pos === undefined || pos < 1) return ''

    return basename.slice(pos + 1)
}
