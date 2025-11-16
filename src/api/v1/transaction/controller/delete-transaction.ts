import { Response } from "express";
import usecasesDeleteTransaction from "../../../../business/usecases/transaction/delete-transaction";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";

async function ControllerDeleteTransaction(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string;
        const { id_transaction } = req.params;
        const result = await usecasesDeleteTransaction(id_transaction as string, account_id);

        return res.status(200).json({
            message: 'success',
            data: {
                status: 'success delete transaction',
                id_transaction,
            }
        })
    } catch (error) {
        logger.error({ message: 'error ControllerDeleteTransaction', error });
        return handleError({ error, res });
    }
};

export default ControllerDeleteTransaction;
