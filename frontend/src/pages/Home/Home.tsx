import * as React from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';

import { ItemList, AddItem, ItemFilter } from '../../components/Items';
import {
  ITEMS_QUERY,
  DELETE_ITEM_MUTATION,
  ADD_ITEM_MUTATION
} from '../../graphql/item';
import { IItem } from '../../types/item';
import styles from './Home.module.scss';

const Home = () => {
  const [searchText, setSearchText] = React.useState<string>('');
  const { loading, error, data, refetch } = useQuery(ITEMS_QUERY, {
    variables: { category: searchText }
  });

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: refetch
  });

  const [addItem] = useMutation(ADD_ITEM_MUTATION, { onCompleted: refetch });

  const createItem = (item: IItem) => addItem({ variables: { ...item } });

  const onDeleteItem = (_id: string) => deleteItem({ variables: { _id } });

  return (
    <div className={styles.container}>
      <Typography variant="h1">Budgety</Typography>
      <ItemFilter setSearchText={setSearchText} />
      <ItemList
        loading={loading}
        error={error}
        items={data?.getItems || []}
        onDeleteItem={onDeleteItem}
      />
      <AddItem createItem={createItem} />
    </div>
  );
};

export default Home;
