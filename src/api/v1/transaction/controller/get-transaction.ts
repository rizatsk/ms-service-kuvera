import { Response } from "express";
import { TypeTransaction } from "../../../../business/repositories/type";
import { usecasesGetTransactionGroupingCategory } from "../../../../business/usecases/transaction/get-transaction";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";

export async function ControllerGetTransactionByCategory(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string;
        const { start_date, end_date, type } = req.query;
        
        const transactionType = type as TypeTransaction;
        if (transactionType !== 'incoming' && transactionType !== 'outgoing') throw '40001';

        const result = await usecasesGetTransactionGroupingCategory({
            account_id,
            start_date: new Date(start_date as string),
            end_date: new Date(end_date as string),
            type: transactionType,
        });

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        logger.error({ message: 'error ControllerEditTransaction', error });
        return handleError({ error, res });
    }
}