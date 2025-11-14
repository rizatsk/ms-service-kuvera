import HandlerAccountGraphQl from "./handler/account";
import HandlerCategorySpendGraphQl from "./handler/categories_spend";

export const resolvers = {
  Query: {
    account: async (parent: any, args: any, { req }: { req: any }) => {
      return await HandlerAccountGraphQl(req);
    },
    categories_spend: async (parent: any, args: any, { req }: { req: any }) => {
      const {status} = args;
      return await HandlerCategorySpendGraphQl(req, status);
    },
  },
};
