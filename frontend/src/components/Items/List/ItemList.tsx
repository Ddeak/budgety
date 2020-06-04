import * as React from 'react';

import { ApolloError } from 'apollo-boost';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

import { IItem } from '../../../types/item';

interface IPropsType {
  loading: boolean;
  error?: ApolloError;
  items: IItem[];
  onDeleteItem: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: theme.spacing(1),
      width: '100%'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '50%'
    },
    totalRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      marginBottom: '1rem'
    },
    col: {
      display: 'flex',
      justifyContent: 'left',
      minWidth: '10rem'
    }
  })
);

const useTotal = (items: IItem[]) => {
  return React.useMemo(() => {
    return items
      .reduce((acc, item) => acc + Number.parseFloat(item.price), 0)
      .toFixed(2);
  }, [items]);
};

const ItemListView = ({ loading, error, items, onDeleteItem }: IPropsType) => {
  const classes = useStyles();
  const total = useTotal(items);

  if (loading && !items.length) return <p>Loading items...</p>;
  if (error) return <p>An error occured fetching items.</p>;

  return (
    <div className={classes.container}>
      <div className={classes.totalRow}>
        <Typography
          color="secondary"
          variant="h5"
        >{`Total: ${total}`}</Typography>
      </div>
      <div className={classes.row}>
        <Typography className={classes.col} variant="h6">
          Name
        </Typography>
        <Typography className={classes.col} variant="h6">
          Category
        </Typography>
        <Typography className={classes.col} variant="h6">
          Price
        </Typography>
        <Typography variant="h6">Actions</Typography>
      </div>

      <Divider variant="middle" />

      {items.map((item: IItem) => (
        <div key={item._id} className={classes.row}>
          <Typography className={classes.col}>{item.name}</Typography>
          <Typography className={classes.col}>{item.category}</Typography>
          <Typography className={classes.col}>{item.price}</Typography>
          <IconButton
            aria-label={`delete item ${item._id}`}
            color="primary"
            onClick={() => onDeleteItem(item._id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default ItemListView;
