import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    getAllItems: [Item!]
    getItem(_id: ID!): Item
  }

  extend type Mutation {
    saveItem(name: String!, category: String!, price: String!): Item!
    deleteItem(_id: ID!): Item
  }

  type Item {
    _id: ID!
    name: String!
    category: String!
    price: String!
    date: DateTime!
  }
`;
