import { Response } from "express";
import usecasesAddTransaction from "../../../../business/usecases/transaction/add-transaction";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";
import usecasesEditTransaction from "../../../../business/usecases/transaction/edit-transaction";

async function ControllerEditTransaction(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string;
        const { id_transaction, category_id, created_dt, money_spent, type, notes } = req.body;
        const result = await usecasesEditTransaction({
            account_id,
            id_transaction,
            category_id,
            created_dt,
            money_spent,
            type,
            notes,
        });

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        logger.error({ message: 'error ControllerEditTransaction', error });
        return handleError({ error, res });
    }
};

export default ControllerEditTransaction;
