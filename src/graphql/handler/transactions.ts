import { Request } from "express";
import { validateSessionAuthTokenGraphQl } from "../../business/domain/auth";
import { getTransactionByAccountId } from "../../business/repositories/transaction";
import { TransactionsArgsType } from "../resolvers";

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

