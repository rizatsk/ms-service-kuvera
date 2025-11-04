import { Request, Response } from "express";
import scrapeHargaEmas from "../../../../service/price-gold-antam/scrape";

export default async function ControlerGetAntamPrice(req: Request, res: Response) {
    try {
        const result = await scrapeHargaEmas();

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch(error) {
        return res.status(400).json({
            message: 'unsuccess'
        })
    }
}