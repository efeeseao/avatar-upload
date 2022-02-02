import React from 'react'
import styled from '@emotion/styled'

type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const StyledSlider = styled.input`
  width: 100%;
`

export const Slider = ({
  ...otherProps
}: SliderProps) => {
  return (
    <StyledSlider data-testid="styled-slider" {...otherProps} type="range"  />
  )
}