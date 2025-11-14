import { Response } from "express";
import usecasesAddCategorySpend from "../../../../business/usecases/category-spend/add-category";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";

async function ControllerAddCategorySpend(req: RequestVerifyTokenProps, res: Response) {
    try {
        const account_id = req.account?.account_id as string,
            name_category = req.body.name_category;
        const result = await usecasesAddCategorySpend(name_category, account_id);

        return res.status(201).json({
            message: 'success',
            data: {
                id: result.id,
                name: result.name
            }
        })
    } catch (error) {
        logger.error({ message: 'error ControllerAddCategorySpend', error });
        return handleError({ error, res });
    }
}

export default ControllerAddCategorySpend;
