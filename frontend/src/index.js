import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import graphqlClient from './graphql/client';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={graphqlClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
