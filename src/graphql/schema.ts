export const typeDefs = `#graphql
  type Account {
    name: String!
    email: String!
    photo_profile_url: String!
    created_dt: String!
    updated_dt: String
  }

  type Query {
    account: Account
  }
`;