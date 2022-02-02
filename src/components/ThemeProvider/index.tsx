import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { theme } from '../../utils/theme';

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <EmotionThemeProvider theme={theme}>
      {children}
    </EmotionThemeProvider>
  )
}
