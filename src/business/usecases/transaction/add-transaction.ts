import { addTransaction } from "../../repositories/transaction";
import { AddTransactionParam } from "../../repositories/type";

async function usecasesAddTransaction(param: AddTransactionParam) {
    const transaction = await addTransaction(param);

    return transaction;
};

export default usecasesAddTransaction;
