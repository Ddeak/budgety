import * as React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ItemList, AddItem, ItemFilter } from '../../components/Items';
import {
  ITEMS_QUERY,
  DELETE_ITEM_MUTATION,
  ADD_ITEM_MUTATION
} from '../../graphql/item';
import { IItem } from '../../types/item';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      background: theme.palette.background.default,
      color: theme.palette.text.primary
    }
  })
);

const Home = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<30 | 60 | null>(30);

  const { loading, error, data, refetch } = useQuery(ITEMS_QUERY, {
    variables: { category: searchText, days: dateRange }
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: refetch
  });

  const [addItem] = useMutation(ADD_ITEM_MUTATION, { onCompleted: refetch });

  const createItem = (item: IItem) => addItem({ variables: { ...item } });

  const onDeleteItem = (_id: string) => deleteItem({ variables: { _id } });

  const onDateRangeChange = (range: 30 | 60 | null) => setDateRange(range);

  return (
    <div className={classes.container}>
      <Typography variant="h2">Budgety</Typography>
      <AddItem createItem={createItem} />
      <ItemFilter
        setSearchText={setSearchText}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
      <ItemList
        loading={loading}
        error={error}
        items={data?.getItems || []}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
};

export default Home;
