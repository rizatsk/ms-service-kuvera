import { Op } from "sequelize";
import uuidGen from "../../config/uuid";
import { Transaction } from "../../models/transaction";
import { AddTransactionParam, EditTransactionParam, GetTransactionByAccountIdParam } from "./type";

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
};

export async function editTransaction(param: EditTransactionParam) {
    const result = await Transaction.update({
        category_id: param.category_id,
        money_spent: param.money_spent,
        notes: param.notes || '',
        type: param.type,
        created_dt: param.created_dt
    }, {
        where: {
            id: param.id_transaction,
            account_id: param.account_id
        }
    });

    return result;
};

export async function deleteTransaction(id_transaction: string, account_id: string) {
    await Transaction.destroy({
        where: {
            id: id_transaction,
            account_id,
        }
    });
};

export async function getTransactionByAccountId(param: GetTransactionByAccountIdParam) {
    const condition: any = {
        account_id: param.account_id,
        type: param.type,
    };

    if (param.start_date && param.end_date) {
        condition.created_dt = {
            [Op.gte]: new Date(param.start_date),
            [Op.lte]: new Date(param.end_date)
        }
    }

    const result = await Transaction.findAll({
        raw: true,
        where: condition,
        order: [['craeted_dt', 'ASC']]
    });

    return result;
}