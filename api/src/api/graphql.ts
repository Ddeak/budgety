import { ApolloServer } from 'apollo-server-micro';
import { getConnection } from '../mongo/index';
const cors = require('micro-cors')();

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

const handler = server.createHandler({ path: '/api/graphql' });

export default cors((req: any, res: any) =>
  req.method === 'OPTIONS' ? res.end() : handler(req, res)
);
