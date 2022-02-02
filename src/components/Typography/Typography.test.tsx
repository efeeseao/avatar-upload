import React from 'react';
import { render } from '@testing-library/react';
import { Typography } from '.';

it('renders correctly', async () => {
  const { queryByTestId } = render(<Typography>content</Typography>);
  expect(queryByTestId('styled-typography')).toMatchSnapshot();
});

it('renders title variant snapshot', async () => {
  const { container } = render(<Typography variant="title">title typography</Typography>);
  expect(container).toMatchSnapshot();
});

it('renders text variant snapshot', async () => {
  const { container } = render(<Typography variant="text">text typography</Typography>);
  expect(container).toMatchSnapshot();
});

it('renders error variant snapshot', async () => {
  const { container } = render(<Typography variant="error">error typography</Typography>);
  expect(container).toMatchSnapshot();
});

it('renders default variant snapshot', async () => {
  const { container } = render(<Typography>typography</Typography>);
  expect(container).toMatchSnapshot();
});
