export interface Theme {
  colors: {
    primary: string
    onPrimary: string
    secondary: string
    background: string
    surface: string
    error: string
  },
  space: [0, 4, 8, 16, 32, 64]
}

export const theme: Theme = {
  colors: {
    primary: '#3F80FE',
    onPrimary: '#FFFFFF',
    secondary: '#4DD684',
    background: '#F2F5F8',
    surface: '#FFFFFF',
    error: 'red'
  },
  space: [0, 4, 8, 16, 32, 64]
};