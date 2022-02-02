import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { typography, TypographyProps as StyledTypographyProps } from 'styled-system'
import { color, ColorProps } from '../../utils/color'

type TypographyProps = {
  children: React.ReactNode
  variant?: 'title' | 'text' | 'error'
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>
  & ColorProps
  & StyledTypographyProps

const StyledTypography = styled.span`
  ${typography}
  ${color}
`

const typographyVariantProps: { [key in NonNullable<TypographyProps['variant']>]: ColorProps & StyledTypographyProps } = {
  title: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '25.2px'
  },
  text: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '25.2px'
  },
  error: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '28.8px',
    textColor: 'error'
  }
}

export const Typography = ({
  variant,
  ...otherProps
}: TypographyProps) => {

  let typographyProps = useMemo<ColorProps & StyledTypographyProps>(() => {
    return variant ? typographyVariantProps[variant] : {}
  }, [variant])

  return (
    <StyledTypography data-testid="styled-typography" {...{ variant }} {...typographyProps} {...otherProps} />
  )
}