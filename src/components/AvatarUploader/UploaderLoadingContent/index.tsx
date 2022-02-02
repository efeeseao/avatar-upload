import React from 'react'
import { ErrorMessage } from '../../../utils/validation'
import { Box } from '../../Box'
import { Button } from '../../Button'
import { CloseIcon } from '../../Icons/CloseIcon'
import { ExclamationIcon } from '../../Icons/ExclamationIcon'
import { PhotoIconBlack, PhotoIconWhite } from '../../Icons/PhotoIcon'
import { ImageCroppingDisplay } from '../../ImageCroppingDisplay'
import { LoadingBar } from '../../LoadingBar'
import { Typography } from '../../Typography'

interface UploaderLoadingContentProps {
  file?: File
  error: ErrorMessage
  progress: number
  maxProgress: number
  onTryAgain: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  onReset: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

export const UploaderLoadingContent = ({
  file,
  error,
  progress,
  maxProgress,
  onReset,
  onTryAgain,
  ...otherProps
}: UploaderLoadingContentProps) => {
  return (
    <Box {...otherProps} display="flex" height="100%">
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {/* TODO: Fix the display of the image cropping */}
        <ImageCroppingDisplay
          height="113px"
          width="113px"
        >
          {error ? (
            <ExclamationIcon />
          ) : (
              <PhotoIconWhite />
            )}
        </ImageCroppingDisplay>
      </Box>
      <Box flex={3} padding={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box width="100%">
          {error ? (
            <div>
              <Typography variant="error">{error}</Typography>
              <div>
                <Button style={{ textDecoration: 'underline' }} variant='text' textColor='black' onClick={onTryAgain}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
              <div>
                <Typography>
                  {file?.name}
                </Typography>
                <LoadingBar {...{ maxProgress, progress }} />
              </div>
            )}
        </Box>
      </Box>
      <Box>
        <Button variant='text' onClick={onReset}>
          <CloseIcon />
        </Button>
      </Box>
    </Box>
  )
}
