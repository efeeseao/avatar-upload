import styled from '@emotion/styled'
import React from 'react'
import { border, BorderProps, layout, LayoutProps, space, SpaceProps } from 'styled-system'

type ImageLoaderProps = {

} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & LayoutProps & BorderProps & SpaceProps

const StyledImageLoader = styled.div<ImageLoaderProps>`
  ${layout}
  ${border}
  ${space}
`

export const ImageLoader = ({...otherProps}: ImageLoaderProps) => {
  return (
    <StyledImageLoader {...otherProps}>

    </StyledImageLoader>
  )
}
