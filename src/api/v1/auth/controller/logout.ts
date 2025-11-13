import { Request, Response } from "express";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";
import usecaseLogout from "../../../../business/usecases/auth/logout";

async function ControllerLogout(req: Request, res: Response) {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw  '40104';
        }
        const token = authHeader.split(' ')[1] as string;

        const newToken = await usecaseLogout(token);

        return res.status(200).json({
            message: 'success',
        });
    } catch(error) {
        logger.error({ message: 'Error ControllerLogout', error });
        return handleError({ error, res });
    }
}

export default ControllerLogout;
