import React from 'react';
import { render } from '@testing-library/react';
import { LoadingBar } from '.';

it('renders correctly', async () => {
  const { queryByTestId } = render(<LoadingBar progress={0} maxProgress={10} />);
  expect(queryByTestId('loading-bar-container')).toBeTruthy();
  expect(queryByTestId('loading-bar-background')).toBeTruthy();
  expect(queryByTestId('loading-bar-progress')).toBeTruthy();
});

it('renders progress bar width correctly', async () => {
  const maxProgress = 10
  let progress = 0
  const { getByTestId, rerender } = render(<LoadingBar progress={progress} maxProgress={maxProgress} />);  
  while(progress <= maxProgress){
    expect(getByTestId('loading-bar-progress')).toHaveStyle(`width: ${(progress / maxProgress) * 100}%;`);
    rerender(<LoadingBar progress={++progress} maxProgress={maxProgress} />);
  }
});

it('renders progress bar without overflow when progress > maxProgress', async () => {
  const maxProgress = 10
  let progress = 15
  const { getByTestId, rerender } = render(<LoadingBar progress={progress} maxProgress={maxProgress} />);  
  expect(getByTestId('loading-bar-progress')).toHaveStyle('width: 100%;');
  rerender(<LoadingBar progress={++progress} maxProgress={maxProgress} />);  
});

it('renders progress bar without overflow when progress < 0', async () => {
  const maxProgress = 10
  let progress = -1
  const { getByTestId, rerender } = render(<LoadingBar progress={progress} maxProgress={maxProgress} />);  
  expect(getByTestId('loading-bar-progress')).toHaveStyle('width: 0%;');
  rerender(<LoadingBar progress={++progress} maxProgress={maxProgress} />);  
});


it('renders empty progress bar when maxProgress == 0', async () => {
  const maxProgress = 0
  let progress = 0
  const { getByTestId, rerender } = render(<LoadingBar progress={progress} maxProgress={maxProgress} />);  
  expect(getByTestId('loading-bar-progress')).toHaveStyle('width: 0%;');
  rerender(<LoadingBar progress={++progress} maxProgress={maxProgress} />);  
});
