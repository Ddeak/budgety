import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemList from './ItemList';
import { ApolloError } from 'apollo-boost';

it('ensures a loading message is displayed when the property is set', () => {
  render(<ItemList loading={true} items={[]} onDeleteItem={jest.fn()} />);

  expect(screen.getByText(/Loading items.../)).toBeInTheDocument();
});

it('ensures an error message is displayed when the property is set', () => {
  render(
    <ItemList
      loading={false}
      error={new ApolloError({ errorMessage: 'test' })}
      items={[]}
      onDeleteItem={jest.fn()}
    />
  );

  expect(
    screen.getByText(/An error occured fetching items/)
  ).toBeInTheDocument();
});

it('renders one item in the item list', () => {
  const name = 'name1';
  const category = 'category1';
  const price = '1.00';

  render(
    <ItemList
      loading={false}
      items={[{ _id: '1', name, category, price }]}
      onDeleteItem={jest.fn()}
    />
  );

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(category)).toBeInTheDocument();
  expect(screen.getByText(price)).toBeInTheDocument();
  expect(screen.getByLabelText(/delete item 1/)).toBeInTheDocument();
});

it('checks the delete method is called when the button is pressed', () => {
  const mockDelete = jest.fn();
  render(
    <ItemList
      loading={false}
      items={[{ _id: '1', name: 'test', category: 'test', price: '0' }]}
      onDeleteItem={mockDelete}
    />
  );

  const deleteButton = screen.getByLabelText(/delete item 1/);

  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(deleteButton);

  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith('1');
});
