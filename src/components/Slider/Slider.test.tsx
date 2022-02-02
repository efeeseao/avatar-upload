import React from 'react';
import { render } from '@testing-library/react';
import { Slider } from '.';

it('renders correctly', async () => {
  const { queryByTestId } = render(<Slider />);
  expect(queryByTestId('styled-slider')).toBeTruthy();
});

it('renders snapshot', async () => {
  const { container } = render(<Slider />);
  expect(container).toMatchSnapshot();
});