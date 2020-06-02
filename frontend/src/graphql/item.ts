import { gql } from 'apollo-boost';

export const ITEMS_QUERY = gql`
  query GetItems($category: String, $days: Int) {
    getItems(category: $category, days: $days) {
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

export const ADD_ITEM_MUTATION = gql`
  mutation SaveITem($name: String!, $category: String!, $price: String!) {
    saveItem(name: $name, category: $category, price: $price) {
      name
      category
      price
    }
  }
`;
