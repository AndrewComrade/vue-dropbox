import { AxiosResponse } from 'axios'
import { api } from '@/config/api/index.ts'
import { Upload } from '@/store/uploads.ts'

export const uploadsApi = {
    fetchAllFiles: (): Promise<AxiosResponse<Upload[]>> => api.get('/list'),

    downloadSingleFile: (filename: string): Promise<AxiosResponse<Blob>> =>
        api.get('/file', {
            params: { filename },
            responseType: 'blob',
        }),

    editSingleFile: ({
        filename,
        name,
    }: {
        filename: string
        name: string
    }): Promise<AxiosResponse<Upload>> =>
        api.put(
            '/file',
            { name },
            {
                params: { filename },
            }
        ),

    deleteSingleFile: (filename: string): Promise<AxiosResponse<string>> =>
        api.delete('/file', {
            params: { filename },
        }),

    uploadSingleFile: (file: File): Promise<AxiosResponse<Upload[]>> =>
        api.post(
            '/file',
            { file },
            {
                params: {
                    filename: file.name,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        ),
}
