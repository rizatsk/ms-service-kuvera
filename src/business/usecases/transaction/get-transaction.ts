import { getSumerizeTransactionByAccountId } from "../../repositories/transaction";
import { GetSumerizeTransactionByAccountIdParam } from "../../repositories/type";

export async function usecasesGetTransactionGroupingCategory(param: GetSumerizeTransactionByAccountIdParam) {
    const transactions = await getSumerizeTransactionByAccountId(param);

    return transactions;
}