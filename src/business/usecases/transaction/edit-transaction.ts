import { editTransaction } from "../../repositories/transaction";
import { EditTransactionParam } from "../../repositories/type";

async function usecasesEditTransaction(param: EditTransactionParam) {
    await editTransaction(param);
};

export default usecasesEditTransaction;
