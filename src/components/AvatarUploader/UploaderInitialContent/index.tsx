import React from 'react'
import { ErrorMessage } from '../../../utils/validation'
import { Box } from '../../Box'
import { PhotoIconBlack } from '../../Icons/PhotoIcon'
import { Typography } from '../../Typography'

interface UploaderInitialContentProps {
  logo?: React.ReactNode
  description?: React.ReactNode
  error: ErrorMessage
}

export const UploaderInitialContent = ({
  logo, 
  description, 
  error,
  ...otherProps
}: UploaderInitialContentProps) => {
  return (
    <Box {...otherProps} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
      <Box>
        {logo ?? (
          <Typography variant="title">
            <Box pr={10} display="inline">
              <PhotoIconBlack />
            </Box>
          </Typography>
        )}
      </Box>
      <Box>
        {description ?? (<Typography variant="text">Drop the image here or click to browse.</Typography>)}
      </Box>
      {error && (
        <Box>
          <Typography variant="error">{error}</Typography>
        </Box>
      )}
    </Box>
  )
}
