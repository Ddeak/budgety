import { ApolloServer } from 'apollo-server-micro';
import { getConnection } from '../mongo/index';

import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const mongoConn = await getConnection();
    return { mongoConn };
  },
  playground: true,
  introspection: true,
});

export default server.createHandler({ path: '/api/graphql' });
