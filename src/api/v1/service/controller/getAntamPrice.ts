import { Request, Response } from "express";
import scrapeHargaEmas from "../../../../service/price-gold-antam/scrape";
import { getIHSGData } from "../../../../service/ihsg";

export default async function ControlerGetAntamPrice(req: Request, res: Response) {
    try {
        // const result = await scrapeHargaEmas();
        const result = await getIHSGData();

        return res.status(200).json({
            message: 'success',
            data: result
        })
    } catch(error) {
        console.error("error controller get antam price", error);
        return res.status(400).json({
            message: 'unsuccess'
        })
    }
}