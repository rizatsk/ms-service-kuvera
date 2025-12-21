import { Request, Response } from "express";
import { ScrapeGoldType, scrapeHargaEmas, scrapeHargaEmasV2 } from "../../../../service/price-gold-antam/scrape";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";

export async function ControlerGetAntamPrice(req: Request, res: Response) {
    try {
        const result = await scrapeHargaEmas();

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        logger.error({ message: 'error ControlerGetAntamPrice', error });
        return handleError({ error, res });
    }
}

export async function ControlerGetGoldPrice(req: Request, res: Response) {
    try {
        const type = req.params?.type || 'all';
        const result = await scrapeHargaEmasV2(type as ScrapeGoldType);

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        logger.error({ message: 'error ControlerGetGoldPrice', error });
        return handleError({ error, res });
    }
}