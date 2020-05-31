import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddItem from './AddItem';

it('renders the AddItem component', () => {
  render(<AddItem createItem={jest.fn()} />);

  expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Category' })).toBeInTheDocument();
  expect(screen.getByRole('spinbutton', { name: 'Price' })).toBeInTheDocument();
  expect(screen.getByTitle('Add Item')).toBeInTheDocument();
});

it('ensure error messages are displayed if values are not provided to the text boxes', async () => {
  const mockCreate = jest.fn();
  render(<AddItem createItem={mockCreate} />);

  const createButton = screen.getByTitle('Add Item');

  fireEvent.click(createButton);

  await waitFor(() =>
    expect(screen.queryAllByText('Required').length).toEqual(3)
  );
  expect(mockCreate).toBeCalledTimes(0);
});

it('checks the createItem function is called with the correct values', async () => {
  const mockCreate = jest.fn();
  render(<AddItem createItem={mockCreate} />);

  const nameInput = screen.getByRole('textbox', { name: 'Name' });
  const categoryInput = screen.getByRole('textbox', { name: 'Category' });
  const priceInput = screen.getByRole('spinbutton', { name: 'Price' });
  const createButton = screen.getByTitle('Add Item');

  fireEvent.change(nameInput, { target: { value: 'Name1' } });
  fireEvent.change(categoryInput, { target: { value: 'Category1' } });
  fireEvent.change(priceInput, { target: { value: '0.5' } });

  fireEvent.click(createButton);

  await waitFor(() => expect(mockCreate).toHaveBeenCalledTimes(1));
  expect(mockCreate).toHaveBeenCalledWith({
    name: 'Name1',
    category: 'Category1',
    price: '0.5'
  });

  expect(nameInput).toHaveValue('');
  expect(categoryInput).toHaveValue('');
  expect(priceInput).toHaveValue(null);
});
