import { Request, Response } from "express";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import usecasesRefreshToken from "../../../../business/usecases/auth/refresh-token";

async function ControllerRefreshToken(req: Request, res: Response) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw  '40104';
        }
        const token = authHeader.split(' ')[1] as string;

        const newToken = await usecasesRefreshToken(token);

        return res.status(201).json({
            message: 'success',
            data: {
                accessToken: newToken.accessToken,
                refreshToken: newToken.refreshToken
            }
        });
    } catch(error) {
        logger.error({ message: 'Error ControllerRefreshToken', error });
        return handleError({ error, res });
    }
};

export default ControllerRefreshToken;
