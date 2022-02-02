import React from 'react';
import { render } from '@testing-library/react';
import { Container } from '.';

it('renders correctly', async () => {
  const { queryByTestId } = render(<Container>content</Container>);
  expect(queryByTestId('styled-container')).toMatchSnapshot();
});

it('renders default snapshot', async () => {
  const { container } = render(<Container>content</Container>);
  expect(container).toMatchSnapshot();
});

it('renders snapshot with colors', async () => {
  const { container } = render(<Container bg="primary">content</Container>);
  expect(container).toMatchSnapshot()
});