import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';

import graphqlClient from '../../../graphql/client';
import AddItem from './AddItem';

it('renders the AddItem component', () => {
  render(
    <ApolloProvider client={graphqlClient}>
      <AddItem />
    </ApolloProvider>
  );

  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Category')).toBeInTheDocument();
  expect(screen.getByLabelText('Price')).toBeInTheDocument();
});
