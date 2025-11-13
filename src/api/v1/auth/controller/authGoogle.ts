import { Request, Response } from "express";
import usecasesAuth from "../../../../business/usecases/auth/auth";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/handle-error";

async function ControllerAuthGoogle(req: Request, res: Response) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw  '40104';
        }
        const authToken = authHeader.split(' ')[1] as string;
        const { accessToken, refreshToken } = await usecasesAuth(authToken);
      
        return res.status(201).json({
            message: 'success',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        })
    } catch (error: any) {
        logger.error({ message: 'Error ControllerAuthGoogle', error });
        return handleError({ error, res });
    }
};

export default ControllerAuthGoogle;
