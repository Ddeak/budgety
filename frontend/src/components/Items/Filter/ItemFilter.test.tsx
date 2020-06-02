import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemFilter from './ItemFilter';

it('renders the AddItem component', () => {
  render(
    <ItemFilter
      setSearchText={jest.fn()}
      dateRange={30}
      onDateRangeChange={jest.fn()}
    />
  );

  expect(screen.getByLabelText('Category Filter')).toBeInTheDocument();
  expect(screen.getByText('30')).toBeInTheDocument();
  expect(screen.getByText('60')).toBeInTheDocument();
  expect(screen.getByText('All Time')).toBeInTheDocument();
});

it('ensures the tabs jave the correct values', async () => {
  const mockChange = jest.fn().mockReturnValueOnce(60);
  const { rerender } = render(
    <ItemFilter
      setSearchText={jest.fn()}
      dateRange={30}
      onDateRangeChange={mockChange}
    />
  );

  const tabs = screen.getAllByRole('tab');

  expect(tabs[0].tabIndex).toEqual(0);
  expect(tabs[1].tabIndex).toEqual(-1);
  expect(tabs[2].tabIndex).toEqual(-1);

  fireEvent.click(tabs[1]);

  await waitFor(() => expect(mockChange).toHaveBeenCalledTimes(1));

  rerender(
    <ItemFilter
      setSearchText={jest.fn()}
      dateRange={60}
      onDateRangeChange={mockChange}
    />
  );

  expect(tabs[0].tabIndex).toEqual(-1);
  expect(tabs[1].tabIndex).toEqual(0);
  expect(tabs[2].tabIndex).toEqual(-1);
});
