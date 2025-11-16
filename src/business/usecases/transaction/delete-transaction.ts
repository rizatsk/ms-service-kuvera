import { deleteTransaction } from "../../repositories/transaction";

async function usecasesDeleteTransaction(id_transaction: string, account_id: string) {
    await deleteTransaction(id_transaction, account_id);
};

export default usecasesDeleteTransaction;
