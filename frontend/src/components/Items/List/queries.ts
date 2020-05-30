import { gql } from 'apollo-boost';

export const ALL_ITEMS_QUERY = gql`
  {
    getAllItems {
      _id
      name
      category
      price
    }
  }
`;

export const CATEGORY_ITEMS_QUERY = gql`
  query GetByCategory($category: String!) {
    getByCategory(category: $category) {
      _id
      name
      category
      price
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($_id: ID!) {
    deleteItem(_id: $_id) {
      _id
    }
  }
`;
