import { Op, QueryTypes, Sequelize } from "sequelize";
import uuidGen from "../../config/uuid";
import { Transaction } from "../../models/transaction";
import { AddTransactionParam, EditTransactionParam, GetSumerizeTransactionByAccountIdParam, GetTransactionByAccountIdParam, TransactionType } from "./type";
import { sequelize } from "../../config/database_pg";
import logger from "../../config/logger";
import { CategorySpend } from "../../models/category_spend";

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

export async function getTransactionByAccountId(param: GetTransactionByAccountIdParam): Promise<TransactionType[]> {
    const condition: any = {
        account_id: param.account_id,
    };

    if (param.start_date && param.end_date) {
        condition.created_dt = {
            [Op.gte]: new Date(param.start_date),
            [Op.lte]: new Date(param.end_date)
        }
    };

    if (param.type !== 'all') {
        condition.type = param.type
    };

    const result = await Transaction.findAll({
        raw: true,
        nest: true,
        include: [
            {
                model: CategorySpend,
                attributes: ["name"],
            },
        ],
        where: condition,
        order: [['created_dt', 'DESC']],
        limit: param.limit
    });

    const mapping = result.map((data) => {
        return {
            id: data.id,
                account_id: data.account_id,
                category_id: data.category_id,
                category_name: data.category.name,
                money_spent: data.money_spent,
                notes: data.notes,
                type: data.type,
                created_dt: data.created_dt,
        }
    })
    return mapping as TransactionType[];
}

export async function getSumerizeTransactionByAccountId({
    account_id, type, start_date, end_date
}: GetSumerizeTransactionByAccountIdParam) {
    const results = await sequelize.query(
        `SELECT category_id, name, SUM(money_spent) as total_money_spent
            FROM transactions 
            JOIN categories_spend AS category 
                ON transactions.category_id = category.id
            WHERE transactions.account_id = :account_id
                AND type = :type 
                AND transactions.created_dt >= :start_date AT TIME ZONE 'UTC'
                AND transactions.created_dt <= :end_date AT TIME ZONE 'UTC'
            GROUP BY category_id, name;
            `,
        {
            replacements: {
                account_id,
                type,
                start_date: start_date,
                end_date: end_date
            },
            type: QueryTypes.SELECT,
        }
    );

    return results;
}
