import { Request, Response } from "express";
import { getIHSGData } from "../../../../service/ihsg";

export default async function ControlerGetIhsgPrice(req: Request, res: Response) {
    try {
        const result = await getIHSGData();

        return res.status(200).json({
            message: 'success',
            data: result.data
        })
    } catch(error) {
        console.error("error controller get ihsg price", error);
        return res.status(400).json({
            message: 'unsuccess'
        })
    }
}