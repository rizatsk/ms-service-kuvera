import HandlerAccountGraphQl from "./handler/account";
import HandlerCategorySpendGraphQl from "./handler/categories_spend";

export const resolvers = {
  Query: {
    account: async (_: any, __: any, { req }: { req: any }) => {
      return await HandlerAccountGraphQl(req);
    },
    categories_spend: async (_: any, __: any, { req }: { req: any }) => {
      return await HandlerCategorySpendGraphQl(req);
    },
  },
};
