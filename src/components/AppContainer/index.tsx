import React from 'react'
import styled from '@emotion/styled'
import { color, ColorProps } from '../../utils/color'

export const ContainerStyle = styled.div<ColorProps>`
  ${color}
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

type AppContainerProps = ColorProps & {
  children: React.ReactNode
}

export const AppContainer = ({ ...otherProps }: AppContainerProps) => {
  return (
    <ContainerStyle {...otherProps} />
  )
}
