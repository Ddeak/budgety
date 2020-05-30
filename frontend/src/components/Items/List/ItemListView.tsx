import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { IItem } from '../../../types/item';
import { makeStyles } from '@material-ui/core/styles';

interface IPropsType {
  items: IItem[];
  onDeleteItem: (id: string) => void;
}

const useStyles = makeStyles({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%'
  }
});

const ItemListView = ({ items, onDeleteItem }: IPropsType) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5">List:</Typography>
      <div className={classes.row}>
        <Typography variant="h6">Name</Typography>
        <Typography variant="h6">Category</Typography>
        <Typography variant="h6">Price</Typography>
        <Typography variant="h6">Actions</Typography>
      </div>
      {items.map((item: IItem) => (
        <div key={item._id} className={classes.row}>
          <Typography>{item.name}</Typography>
          <Typography>{item.category}</Typography>
          <Typography>{item.price}</Typography>
          <IconButton color="primary" onClick={() => onDeleteItem(item._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </>
  );
};

export default ItemListView;
