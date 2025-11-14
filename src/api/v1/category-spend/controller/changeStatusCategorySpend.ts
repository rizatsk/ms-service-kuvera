import { Response } from "express";
import usecasesUpdateStatusCategorySpend from "../../../../business/usecases/category-spend/update-status-category";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";

async function ControllerChangeStatusCategorySpend(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string;
        const {category_id, status} = req.body;
        await usecasesUpdateStatusCategorySpend({
            account_id, 
            id: category_id, 
            status
        });

        return res.status(200).json({
            message: 'success',
            data: {
                category_id,
                status
            }
        })
    } catch (error) {
        logger.error({ message: 'error ControllerChangeStatusCategorySpend', error });
        return handleError({ error, res });
    }
}

export default ControllerChangeStatusCategorySpend;
