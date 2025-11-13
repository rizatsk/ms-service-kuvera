import uuidGen from "../../config/uuid";
import { CategorySpend } from "../../models/category_spend";

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