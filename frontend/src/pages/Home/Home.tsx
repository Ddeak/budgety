import * as React from 'react';

import Typography from '@material-ui/core/Typography';

import { ItemList, AddItem } from '../../components/Items';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h1">Home Page</Typography>
      <AddItem />
      <ItemList />
    </div>
  );
};

export default Home;
