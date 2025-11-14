import { QueryTypes } from "sequelize";
import { sequelize } from "../../config/database_pg";
import uuidGen from "../../config/uuid";
import { CategorySpend } from "../../models/category_spend";
import { ChangeStatusCategorySpendParam } from "./type";

export async function addCategorySpend(name: string, account_id: string) {
    const result = await CategorySpend.create({
        id: uuidGen(),
        name: name.toLowerCase().trim(),
        account_id
    });

    return result.dataValues;
}

export async function getCategorySpendByNameAndAccountId(name: string, account_id: string) {
    const result = await CategorySpend.findOne({
        raw: true,
        where: {
            account_id,
            name: name.toLowerCase().trim()
        },
        attributes: ['id']
    });

    return result;
}

export async function changeStatusCategorySpend({ id, status, account_id }: ChangeStatusCategorySpendParam) {
    await CategorySpend.update(
        {
            status,
        },
        {
            where: {
                id,
                account_id
            }
        }
    );
}

export async function getCategorySpendByAccountId(account_id: string) {
    const results = await sequelize.query(
        `SELECT id, name, status
      FROM categories_spend
      WHERE account_id IN('all', :id)`,
        {
            replacements: { id: account_id },
            type: QueryTypes.SELECT,
        }
    );

    return results;
}

export async function getCategorySpendByAccountIdAndStatus(account_id: string, status: boolean) {
    const results = await sequelize.query(
        `SELECT id, name, status
      FROM categories_spend
      WHERE account_id IN('all', :id) and status = :status`,
        {
            replacements: { id: account_id, status },
            type: QueryTypes.SELECT,
        }
    );
    
    return results;
}