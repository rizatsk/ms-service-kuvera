import { addCategorySpend, getCategorySpendByNameAndAccountId } from "../../repositories/category_spend";

async function usecasesAddCategorySpend(name: string, account_id: string) {
    const categorySpendExisting = await getCategorySpendByNameAndAccountId(name, account_id);

    if (categorySpendExisting) throw '40010';
    return await addCategorySpend(name, account_id)
}

export default usecasesAddCategorySpend;
