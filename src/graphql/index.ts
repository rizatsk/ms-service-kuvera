import { ApolloServer } from "@apollo/server";
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import customFormatErrorGraphQl from "./format-error";

// GraphQL
const serverGraphql = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: customFormatErrorGraphQl,
    introspection: false,
});

export default serverGraphql;