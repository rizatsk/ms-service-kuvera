import { Request, Response } from "express";
import scrapeHargaEmas from "../../../../service/price-gold-antam/scrape";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";

export default async function ControlerGetAntamPrice(req: Request, res: Response) {
    try {
        const result = await scrapeHargaEmas();

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch(error) {
        logger.error({ message: 'error ControlerGetAntamPrice', error });
        return handleError({ error, res });
    }
}