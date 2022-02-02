import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Theme } from '../../utils/theme'
import { color, ColorProps } from '../../utils/color'

type ButtonProps = {
  variant?: 'text' | 'contained'  
} & ColorProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const StyledButton = styled.button<ButtonProps, Theme>`
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  ${props => props.variant === 'text' ? css`
    ${color(props)}
    background: none;
  ` : ''}
  ${props => props.variant === 'contained' ? css`    
    ${color(props)}
    padding: 4px 16px;
    border-radius: 16px;
  ` : ''}
`

export const Button = ({
  children,
  textColor = 'primary',
  variant = 'text',
  bg = 'primary',  
  ...otherProps
}: ButtonProps) => {
  return (
    <StyledButton data-testid='styled-button' {...{ bg, variant, textColor }} {...otherProps}>
      {children}
    </StyledButton>
  )
}