import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';

import Home from './Home';
import graphqlClient from '../../graphql/client';

describe('Home Page Rendering', () => {
  it('renders the Home page', () => {
    render(
      <ApolloProvider client={graphqlClient}>
        <Home />
      </ApolloProvider>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
