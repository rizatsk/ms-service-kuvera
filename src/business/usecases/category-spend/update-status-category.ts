import { changeStatusCategorySpend } from "../../repositories/category_spend";
import { ChangeStatusCategorySpendParam } from "../../repositories/type";

async function usecasesUpdateStatusCategorySpend({id, status, account_id}: ChangeStatusCategorySpendParam) {
    await changeStatusCategorySpend({id, status, account_id})
}

export default usecasesUpdateStatusCategorySpend;
