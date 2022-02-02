import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'
import { layout, LayoutProps } from 'styled-system'
import { clamp } from '../../utils'
import { color, ColorProps } from '../../utils/color'
import { Theme } from '../../utils/theme'

type LoadingBarProps = {
  progress: number // between 0 and 1
  maxProgress: number
} & ColorProps & Omit<LayoutProps, 'height'>

const LoadingBarProgress = styled.div<LoadingBarProps, Theme>`
  ${color}
  width: ${props => clamp(props.maxProgress === 0 ? 0 : ((props.progress / props.maxProgress) * 100), 0, 100)}%;
  transition: width 0.5s;
  height: 100%;
  position: absolute;
`

const LoadingBarBackground = styled.div`
  background-color: #E7EBEF;
  width: 100%;
  height: 100%;
  position: absolute;
`

const LoadingBarContainer = styled.div<Omit<LayoutProps, 'height'>, Theme>`
  ${layout}
  height: 6px;
  position: relative;
`

export const LoadingBar = ({
  progress,
  maxProgress,
  bg = 'secondary',
  ...otherProps
}: LoadingBarProps) => {
  return (
    <LoadingBarContainer data-testid="loading-bar-container" {...otherProps}>
      <LoadingBarBackground data-testid="loading-bar-background"/>
      <LoadingBarProgress data-testid="loading-bar-progress" {...{ progress, maxProgress, bg }} />
    </LoadingBarContainer>
  )
}