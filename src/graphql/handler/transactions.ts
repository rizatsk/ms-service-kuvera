import { Request } from "express";
import { validateSessionAuthTokenGraphQl } from "../../business/domain/auth";
import { getSumerizeTransactionByAccountId, getTransactionByAccountId, getTransactionsByCategory } from "../../business/repositories/transaction";
import { SumerizeCategoryTransactionArgsType, TransactionsArgsType, TransactionsByCategoryArgsType } from "../resolvers";
import { TypeTransaction } from "../../business/repositories/type";

export async function HandlerTransactionsGraphql(req: Request, args: TransactionsArgsType) {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new Error('40104');
    }

    const token = auth.split(" ")[1] as string;
    // Verify token JWT
    const data_user = await validateSessionAuthTokenGraphQl(token);

    return getTransactionByAccountId({
        account_id: data_user.account_id,
        type: args.type,
        limit: args.limit,
        start_date: args.start_date || '',
        end_date: args.end_date || '',
    });
}

export async function HandlerSumCategoryTransactionGraphQl(req: Request, args: SumerizeCategoryTransactionArgsType) {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new Error('40104');
    }

    const token = auth.split(" ")[1] as string;
    // Verify token JWT
    const data_user = await validateSessionAuthTokenGraphQl(token);

    return getSumerizeTransactionByAccountId({
        account_id: data_user.account_id,
        type: args.type as TypeTransaction,
        start_date: new Date(args.start_date as string),
        end_date: new Date(args.end_date as string)
    })
}

export async function HandlerGetTransactionByCategoryId(req: Request, args: TransactionsByCategoryArgsType) {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new Error('40104');
    }

    const token = auth.split(" ")[1] as string;
    // Verify token JWT
    const data_user = await validateSessionAuthTokenGraphQl(token);

    return getTransactionsByCategory({
        account_id: data_user.account_id,
        category_id: args.category_id,
        start_date: new Date(args.start_date),
        end_date: new Date(args.end_date)
    })
}