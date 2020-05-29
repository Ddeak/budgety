import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ALL_ITEMS_QUERY = gql`
  {
    getAllItems {
      name
      category
      price
    }
  }
`;

const ItemList = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Typography variant="h5">List:</Typography>
    </div>
  );
};

export default ItemList;
