import * as React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { DocumentNode } from 'apollo-boost';

import ItemListView from './ItemListView';

import { ITEMS_QUERY, DELETE_ITEM_MUTATION } from '../queries';

const ItemList = () => {
  const { loading, error, data } = useQuery(ITEMS_QUERY, {
    variables: { category: null }
  });
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    refetchQueries: [{ query: ITEMS_QUERY }]
  });

  const onDeleteItem = async (_id: string) => {
    deleteItem({ variables: { _id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <ItemListView items={data.getItems} onDeleteItem={onDeleteItem} />;
};

export default ItemList;
