import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import Home from './Home';
import { mocks } from '../../graphql/tests';

describe('Home Page Rendering', () => {
  it('renders the Home page with a single mocked result.', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(screen.getByText('Budgety')).toBeInTheDocument();
    expect(screen.getByText(/Loading items.../)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText('name1')).toBeInTheDocument()
    );
    expect(screen.queryByText('category1')).toBeInTheDocument();
    expect(screen.queryByText('1.00')).toBeInTheDocument();
  });
});

describe('GraphQL Mocks', () => {
  it('deletes an item from the item list', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText('name1')).toBeInTheDocument()
    );

    const deleteButton = screen.getByLabelText('delete item 1');
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.queryByText('name1')).toBeNull());
  });

  it('adds an item from the item list', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText('name1')).toBeInTheDocument()
    );

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    fireEvent.change(nameInput, { target: { value: 'newItem' } });
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: 'newCategory' }
    });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Price' }), {
      target: { value: '3.50' }
    });
    const createButton = screen.getByTitle('Add Item');

    fireEvent.click(createButton);

    await waitFor(() =>
      expect(screen.queryByText('newItem')).toBeInTheDocument()
    );
    expect(screen.getByText('newCategory')).toBeInTheDocument();
    expect(screen.getByText('3.50')).toBeInTheDocument();
  });

  it('returns only elements by the specified category', async () => {
    // TO DO
  });
});
