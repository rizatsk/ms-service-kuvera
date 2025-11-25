import { Request } from "express";
import HandlerAccountGraphQl from "./handler/account";
import HandlerCategorySpendGraphQl from "./handler/categories_spend";
import { TypeTransaction } from "../business/repositories/type";
import { HandlerSumCategoryTransactionGraphQl, HandlerTransactionsGraphql } from "./handler/transactions";

export type TransactionsArgsType = {
  type: TypeTransaction | 'all',
  limit: number,
  start_date?: string,
  end_date?: string
}

export type SumerizeCategoryTransactionArgsType = {
  type: String, 
  start_date: String, 
  end_date: String
}

export const resolvers = {
  Query: {
    account: async (parent: any, args: any, { req }: { req: any }) => {
      return await HandlerAccountGraphQl(req);
    },
    categories_spend: async (parent: any, args: any, { req }: { req: any }) => {
      const {status} = args;
      return await HandlerCategorySpendGraphQl(req, status);
    },
    transactions: async (parent: any, args: TransactionsArgsType, {req}: {req: Request}) => {
      return await HandlerTransactionsGraphql(req, args);
    },
    sumerize_category_transactions: async (parent: any, args: SumerizeCategoryTransactionArgsType, {req}: {req: Request}) => {
      return await HandlerSumCategoryTransactionGraphQl(req, args);
    }
  },
};
