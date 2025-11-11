import { Request, Response } from "express";
import usecasesAuth from "../../../../business/usecases/auth/auth";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/handle-error";

export async function ControllerAuthGoogle(req: Request, res: Response) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw  40460;
        }
        const authToken = authHeader.split(' ')[1] as string;
        await usecasesAuth(authToken);
      
        return res.status(200).json({
            message: 'success',
            data: {
                accessToken: 'oke',
                refreshToken: 'oke'
            }
        })
    } catch (error: any) {
        logger.error({ message: 'Error ControllerAuthGoogle', error });
        return handleError({ error, res });
    }
}