import * as React from 'react';

import { useMutation } from '@apollo/react-hooks';

import AddItemView from './AddItemView';
import { IItem } from '../../../types/item';

import { ADD_ITEM_MUTATION, ITEMS_QUERY } from '../queries';

const AddItem = () => {
  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    refetchQueries: [{ query: ITEMS_QUERY }]
  });
  const createItem = (item: IItem) => {
    addItem({ variables: { ...item } });
  };

  return <AddItemView createItem={createItem} />;
};

export default AddItem;
