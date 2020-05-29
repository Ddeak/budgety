import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { IItem } from '../../../types/item';

interface IPropsType {
  items: IItem[];
}

const ItemListView = ({ items }: IPropsType) => {
  return (
    <>
      <Typography variant="h5">List:</Typography>
      {items.map((item: IItem) => (
        <div key={item._id}>
          <Typography>{item.name}</Typography>
          <Typography>{item.category}</Typography>
          <Typography>{item.price}</Typography>
        </div>
      ))}
    </>
  );
};

export default ItemListView;
