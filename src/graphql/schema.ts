export const typeDefs = `#graphql
  type Account {
    name: String!
    email: String!
    photo_profile_url: String!
    created_dt: String!
    updated_dt: String
  }

  type Category_Spend {
    id: String!
    name: String!
    status: Boolean!
  }

  type Query {
    account: Account
    categories_spend(status: Boolean): [Category_Spend!]!
  }
`;