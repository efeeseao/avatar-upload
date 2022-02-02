import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { useTheme } from 'emotion-theming';
import { theme, Theme } from '../../utils/theme';

// TODO: Find a cleaner way to test if the useTheme hook is receiving the correct theme
const TestThemeComponent = () => {
  const theme = useTheme<Theme>()
  return <div data-testid="stringified-theme" >{JSON.stringify(theme)}</div>
}

it('passes the theme context correctly', async () => {
  const { queryByTestId } = render(
    <ThemeProvider>
      <TestThemeComponent />
    </ThemeProvider>
  );
  expect(queryByTestId('stringified-theme')?.textContent).toBe(JSON.stringify(theme));
});
