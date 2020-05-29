import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ALL_ITEMS = gql`
  {
    getAllItems {
      name
      category
      price
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('thisfar', data);
  return (
    <div>
      <Typography variant="h1">Home Page</Typography>
    </div>
  );
};

export default Home;
