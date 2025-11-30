import { changeNameCategorySpend } from "../../repositories/category_spend";
import { ChangeNameCategorySpendParam } from "../../repositories/type";

async function usecasesEditCategorySpend(param: ChangeNameCategorySpendParam) {
    const updateCategorySpend = await changeNameCategorySpend(param);

    return updateCategorySpend;
}

export default usecasesEditCategorySpend;