import { Response } from "express";
import usecasesAddTransaction from "../../../../business/usecases/transaction/add-transaction";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";

async function ControllerAddTransaction(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string;
        const { category_id, created_dt, money_spent, type, notes } = req.body;
        const result = await usecasesAddTransaction({
            account_id,
            category_id,
            created_dt,
            money_spent,
            type,
            notes,
        });

        return res.status(201).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        logger.error({ message: 'error ControllerAddTransaction', error });
        return handleError({ error, res });
    }
};

export default ControllerAddTransaction;
