import uuidGen from "../../config/uuid";
import { Transaction } from "../../models/transaction";
import { AddTransactionParam } from "./type";

export async function addTransaction(param: AddTransactionParam) {
    const newTransaction = await Transaction.create({
        id: uuidGen(),
        account_id: param.account_id,
        category_id: param.category_id,
        money_spent: param.money_spent,
        notes: param.notes || '',
        type: param.type,
        created_dt: param.created_dt
    });

    return newTransaction.dataValues;
}