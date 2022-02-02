import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDragDrop } from '../../hooks/useDragDrop'
import { useFileUploader } from '../../hooks/useFileUploader'
import { Chunk, FileChunk, getFileBase64 } from '../../utils/files'
import { ErrorMessage, ResultDataError } from '../../utils/validation'
import { Box } from '../Box'
import { Button } from '../Button'
import { Container } from '../Container'
import { CloseIcon } from '../Icons/CloseIcon'
import { ExclamationIcon } from '../Icons/ExclamationIcon'
import { PhotoIconBlack, PhotoIconWhite } from '../Icons/PhotoIcon'
import { ImageCroppingDisplay } from '../ImageCroppingDisplay'
import { LoadingBar } from '../LoadingBar'
import { Slider } from '../Slider'
import { Typography } from '../Typography'
import { UploaderInitialContent } from './UploaderInitialContent'
import { UploaderLoadingContent } from './UploaderLoadingContent'

interface AvatarUploaderProps {
  validateFile?: (file: File) => ResultDataError<boolean, ErrorMessage>
  accept?: string
  logo?: React.ReactNode
  description?: string
  chunkSize?: number
  uploadChunk: (chunk: FileChunk) => Promise<ResultDataError<FileChunk, ErrorMessage>>
}

const CANCELATION_TOKEN_ERROR = '__CANCELATION_TOKEN_ERROR__'

type UploadedStatus = 'initial' | 'loading' | 'cropping' | 'done'

// Only allow one file to be upload and it must be an image
const defaultFileValidation = (file: File, accept: AvatarUploaderProps['accept']): ResultDataError<boolean, ErrorMessage> => {
  let error = null
  let data = false

  if (accept && file.type !== accept) { // validate if file is an image
    error = `File must be of type ${accept}`
  }
  else if (!file.type.includes('image/')) { // validate if file is an image
    error = 'File must be an image'
  }
  data = true
  return { data, error }
}

export const AvatarUploader = ({
  validateFile,
  accept,
  logo,
  description,
  uploadChunk,
  chunkSize = 1024
}: AvatarUploaderProps) => {

  // TODO: make this a reducer instead of using many states
  const [error, setError] = useState<ErrorMessage>(null)
  const [avatarFile, setAvatarFile] = useState<File>()
  const [avatarFileBase64, setAvatarFileBase64] = useState<string | undefined>()
  const [uploaderStatus, setUploaderStatus] = useState<UploadedStatus>('loading')
  const [uploadFile, { progress, maxProgress, cancelUpload }] = useFileUploader({
    uploadChunk,
    onAfterUploadSucess: () => setUploaderStatus('cropping')
  })

  useEffect(() => {
    const getBase64 = async () => {
      if (avatarFile) {
        try {
          const base64 = await getFileBase64<string>(avatarFile)
          setAvatarFileBase64(base64)
        } catch (error) {
          setAvatarFileBase64(undefined)
        }
      }
    }
    getBase64()
  }, [avatarFile])

  const resetState = useCallback(() => {
    setError(null)
    setAvatarFile(undefined)
    setUploaderStatus('initial')
    cancelUpload()
  }, [cancelUpload])

  const onDrop = useCallback((e: React.DragEvent<HTMLElement>) => {
    const files = e.dataTransfer.files
    // allow only single file to be droped
    if (files.length > 1) {
      resetState()
      return setError('Can only upload 1 file')
    }
    const file = files[0]
    setAvatarFile(file)
    setUploaderStatus('loading')
    uploadFile(file)
  }, [uploadFile, resetState])

  const { isDragging, ...dragDropProps } = useDragDrop({ onDrop })
  console.log(progress, maxProgress)
  return (
    <Container
      {...dragDropProps}
      border={`2px dashed ${isDragging ? 'deepskyblue' : '#C7CDD3'}`}
      width="553px" // Fix this
      height="177px"
      borderRadius="8px">
      {uploaderStatus === 'initial' && (
        <UploaderInitialContent {...{ logo, description, error }} />
      )}
      {uploaderStatus === 'loading' && (
        <UploaderLoadingContent
          error={error}
          file={avatarFile}
          onReset={resetState}
          onTryAgain={() => avatarFile != null ? uploadFile(avatarFile) : undefined}
          {...{ progress, maxProgress }}
        />
      )}
      {uploaderStatus === 'cropping' && (
        <div>
          {/* TODO: cropping */}
          <img
            height="100"
            width="100" src={avatarFileBase64}
            alt="uploaded file representation"
          />
        </div>
      )}
    </Container>
  )
}