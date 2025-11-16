import { Request, Response } from "express";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import { getIHSGData } from "../../../../service/ihsg";

export default async function ControlerGetIhsgPrice(req: Request, res: Response) {
    try {
        const result = await getIHSGData();

        return res.status(200).json({
            message: 'success',
            data: result.data
        })
    } catch(error) {
        logger.error({ message: 'error ControlerGetIhsgPrice', error });
        return handleError({ error, res });
    }
}