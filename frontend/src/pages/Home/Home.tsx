import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { ItemList, AddItem, ItemFilter } from '../../components/Items';
import styles from './Home.module.scss';

const Home = () => {
  const [searchText, setSearchText] = React.useState<string>('');

  return (
    <div className={styles.container}>
      <Typography variant="h1">Budgety</Typography>
      <AddItem />
      <ItemFilter setSearchText={setSearchText} />
      <ItemList searchCategory={searchText} />
    </div>
  );
};

export default Home;
