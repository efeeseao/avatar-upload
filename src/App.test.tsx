import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders avatar uploader', async () => {
  const { queryAllByTestId } = render(<App />);
  expect(queryAllByTestId('avatar-uploader')).toBeTruthy();
});
