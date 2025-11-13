import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import handleError from "../helper/error/handle-error";
import { verifyAuthToken } from "../business/domain/auth/auth-token";

export interface RequestVerifyTokenProps extends Request {
    account?: {
        account_id: string,
        email: string
    }
}

function verifyToken(req: RequestVerifyTokenProps, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw '40104';
        }
        const token = authHeader.split(' ')[1] as string;

        const data_user = verifyAuthToken(token);
        req.account = {
            account_id: data_user.account_id,
            email: data_user.email,
        };

        next()
    } catch (error) {
        logger.error({ message: 'error verify token', error });
        return handleError({ error, res });
    }
};

export default verifyToken;