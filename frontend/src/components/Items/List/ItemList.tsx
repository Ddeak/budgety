import * as React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { DocumentNode } from 'apollo-boost';

import ItemListView from './ItemListView';

import {
  ALL_ITEMS_QUERY,
  CATEGORY_ITEMS_QUERY,
  DELETE_ITEM_MUTATION
} from './queries';

const ItemList = () => {
  const [currentQuery, setQuery] = React.useState<DocumentNode>(
    ALL_ITEMS_QUERY
  );
  const { loading, error, data } = useQuery(currentQuery, {
    variables: { category: 'test' }
  });
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);

  const onDeleteItem = (_id: string) => {
    deleteItem({ variables: { _id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <ItemListView items={data.getAllItems} onDeleteItem={onDeleteItem} />;
};

export default ItemList;
