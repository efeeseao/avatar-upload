import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Button } from '.';
import { ThemeProvider } from '../ThemeProvider';

it('renders correctly', async () => {
  const { queryByTestId } = render(
    <ThemeProvider>
      <Button>content</Button>
    </ThemeProvider>
  );
  expect(queryByTestId('styled-button')).toMatchSnapshot();
});

it('renders snapshot', async () => {
  const { container } = render(
    <ThemeProvider>
      <Button textColor="red">click me</Button>
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
});

it('triggers clicks correctly', async () => {
  const onClick = jest.fn()
  const { getByTestId } = render(
    <ThemeProvider>
      <Button onClick={onClick}>click me</Button>
    </ThemeProvider>
  );
  fireEvent.click(getByTestId('styled-button'))
  expect(onClick).toBeCalledTimes(1);
});
