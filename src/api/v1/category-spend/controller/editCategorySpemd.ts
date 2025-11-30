import { Response } from "express";
import usecasesEditCategorySpend from "../../../../business/usecases/category-spend/edit-category";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";

async function ControllerEditCategorySpend(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string,
            {category_id, category_name} = req.body;
        const result = await usecasesEditCategorySpend({
            account_id,
            category_id,
            category_name
        });

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        logger.error({ message: 'error ControllerEditCategorySpend', error });
        return handleError({ error, res });
    }
}

export default ControllerEditCategorySpend;
