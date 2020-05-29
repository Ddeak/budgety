import * as React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import ItemListView from './ItemListView';

const ALL_ITEMS_QUERY = gql`
  {
    getAllItems {
      _id
      name
      category
      price
    }
  }
`;

const ItemList = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <ItemListView items={data.getAllItems} />;
};

export default ItemList;
