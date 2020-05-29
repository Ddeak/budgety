import * as React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import AddItemView from './AddItemView';
import { IItem } from '../../../types/item';

const ADD_ITEM_MUTATION = gql`
  mutation SaveITem($name: String!, $category: String!, $price: String!) {
    saveItem(name: $name, category: $category, price: $price) {
      name
      category
      price
    }
  }
`;

const AddItem = () => {
  const [addItem] = useMutation(ADD_ITEM_MUTATION);
  const createItem = (item: IItem) => {
    addItem({ variables: { ...item } });
  };

  return <AddItemView createItem={createItem} />;
};

export default AddItem;
