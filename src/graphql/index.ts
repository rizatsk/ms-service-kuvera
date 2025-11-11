import { ApolloServer } from "@apollo/server";
import { resolvers } from './resolvers';
import { typeDefs } from './schema';

// GraphQL
const serverGraphql = new ApolloServer({
    typeDefs,
    resolvers,
});

export default serverGraphql;