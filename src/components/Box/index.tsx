import styled from '@emotion/styled'
import React from 'react'
import { layout, space, flexbox, FlexboxProps, SpaceProps, LayoutProps  } from 'styled-system'

type BoxProps = {
  
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  & FlexboxProps & SpaceProps & LayoutProps

const StyledBox = styled.div<BoxProps>`
  ${layout}
  ${space}
  ${flexbox}
`

export const Box = (props: BoxProps) => {
  return (
    <StyledBox {...props} />
  )
}
