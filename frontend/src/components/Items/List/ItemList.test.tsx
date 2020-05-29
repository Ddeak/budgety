import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';

import graphqlClient from '../../../graphql/client';
import ItemList from './ItemList';

it('renders the ItemList component', () => {
  render(
    <ApolloProvider client={graphqlClient}>
      <ItemList />
    </ApolloProvider>
  );

  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});
