import React from 'react';
import { render, screen } from '@testing-library/react';

import AddItem from './AddItem';

it('renders the AddItem component', () => {
  render(<AddItem />);

  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Category')).toBeInTheDocument();
  expect(screen.getByLabelText('Price')).toBeInTheDocument();
});
