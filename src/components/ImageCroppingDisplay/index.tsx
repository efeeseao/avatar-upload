import styled from '@emotion/styled'
import React from 'react'
import { layout, LayoutProps, position, PositionProps, space, SpaceProps } from 'styled-system'
import { Theme } from '../../utils/theme'

type ImageDisplayProps = {
  children?: React.ReactNode
} & LayoutProps & SpaceProps & PositionProps

const ImageCircle = styled.div<ImageDisplayProps, Theme>`
  border-radius: 50%;
  background: #C3CBD5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${layout}
  ${space}
  ${position}
`

export const ImageCroppingDisplay = ({ ...otherProps }: ImageDisplayProps) => {
  return (
    <ImageCircle {...otherProps} />
  )
}
