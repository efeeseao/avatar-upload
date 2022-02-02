import React from 'react'
import styled from '@emotion/styled'
import { color, ColorProps } from '../../utils/color'
import { border, BorderProps, layout, LayoutProps, space, SpaceProps } from 'styled-system'

type ContainerProps = {
  children: NonNullable<React.ReactNode>
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & ColorProps & LayoutProps & SpaceProps & BorderProps


const StyledContainer = styled.div<ContainerProps>`
  ${color}
  ${layout}
  ${space}
  ${border}
`

export const Container = ({
  children,
  textColor = 'black',
  bg = 'background',
  p = 16,
  ...otherProps
}: ContainerProps) => {
  return (
    <StyledContainer data-testid="styled-container" {...{ textColor, bg, p }} {...otherProps}>
      {children}
    </StyledContainer>
  )
}