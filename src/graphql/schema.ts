export const typeDefs = `#graphql
  scalar DateTime

  type Account {
    name: String!
    email: String!
    photo_profile_url: String!
    created_dt: DateTime!
    updated_dt: DateTime
  }

  type Category_Spend {
    id: String!
    name: String!
    status: Boolean!
  }

  type Transactions {
    id: String!
    category_name: String!
    money_spent: Int!
    notes: String!
    type: String!
    created_dt: DateTime!
  }

  type Query {
    account: Account
    categories_spend(status: Boolean): [Category_Spend!]!
    transactions(type: String, limit: Int, start_date: String, end_date: String): [Transactions!]!
  }
`;