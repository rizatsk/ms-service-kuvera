export const typeDefs = `#graphql
  type User {
    name: String!
    photo_profile_url: String!
    updated_dt: String!
  }

  type Account {
    id: ID!
    email: String!
    created_dt: String!
    user: User
  }

  type Query {
    account: Account
  }
`;