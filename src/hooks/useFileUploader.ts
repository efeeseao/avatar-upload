import { useState, useRef, useCallback } from "react"
import { Chunk, FileChunk, getFileChunks } from "../utils/files"
import { ResultDataError, ErrorMessage } from "../utils/validation"

interface UseFileUploaderParameters {
  chunkSize?: number
  onAfterUploadSucess?: () => void
  onValidationFail?: (error: ErrorMessage) => void
  uploadChunk: (chunk: FileChunk) => Promise<ResultDataError<FileChunk, ErrorMessage>>  
}

const CANCELATION_TOKEN_ERROR = '__CANCELATION_TOKEN_ERROR__'

type UseFileUpload = (options: UseFileUploaderParameters) => [
  (file: File) => Promise<void>,
  {progress: number, maxProgress: number, cancelUpload: () => void}
]

export const useFileUploader: UseFileUpload = ({
  chunkSize = 20240,
  onAfterUploadSucess,
  onValidationFail,
  uploadChunk,
}: UseFileUploaderParameters) => {
  const [loadingStatus, setLoadingStatus] = useState<{ progress: number, maxProgress: number }>({ progress: 0, maxProgress: 0 })
  const cancelationToken = useRef({ isCanceled: false })

  const cancelUpload = useCallback(() => {
    setLoadingStatus({ progress: 0, maxProgress: 0 })
    cancelationToken.current.isCanceled = true
  }, [])

  const uploadFile = useCallback(async (file: File) => {
    const uploadFileByChunks = async (chunks: Chunk[]) => {
      // Upload all chunks at once
      const chunkUploadPromise = chunks.map(async chunk => {
        const uploadResult = await uploadChunk({ file: file, chunk })
        if (uploadResult.error) {
          cancelationToken.current.isCanceled = true
          throw uploadResult.error
        }
        if (cancelationToken.current.isCanceled) {
          throw CANCELATION_TOKEN_ERROR
        }
        setLoadingStatus(prev => ({ maxProgress: prev.maxProgress, progress: prev.progress + chunkSize }))
        return uploadResult
      })

      try {
        await Promise.all(chunkUploadPromise)
        if (onAfterUploadSucess) onAfterUploadSucess()
      } catch (error) {
        if (typeof error === 'string' && error === CANCELATION_TOKEN_ERROR) {
          return
        }
        if (onValidationFail) {
          onValidationFail(error)
        }
      }
    }

    cancelationToken.current.isCanceled = false
    setLoadingStatus({ progress: 0, maxProgress: file.size })
    const chunks = await getFileChunks(file)    
    await uploadFileByChunks(chunks)  

  }, [chunkSize, uploadChunk, onAfterUploadSucess, onValidationFail])

  return [uploadFile, { ...loadingStatus, cancelUpload }]
}