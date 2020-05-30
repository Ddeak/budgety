import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemFilter from './ItemFilter';

it('renders the AddItem component', () => {
  render(<ItemFilter setSearchText={jest.fn()} />);

  expect(screen.getByLabelText('Category')).toBeInTheDocument();
});
