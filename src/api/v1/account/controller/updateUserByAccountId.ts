import { Response } from "express";
import usecaseUpdateUserByAccountId from "../../../../business/usecases/account/update-user";
import { RequestVerifyTokenProps } from "../../../../middleware/verify-token";
import logger from "../../../../config/logger";
import handleError from "../../../../helper/error/handle-error";

export default async function ControllerUpdateUserByAccountId(req: RequestVerifyTokenProps, res: Response) {
    try {
        const { account_id } = req.account as { account_id: string, email: string };
        const { name } = req.body;
        const photo_profile = req.file; 

        const{ update_name, photo_profile_url } = await usecaseUpdateUserByAccountId({
            account_id: account_id,
            name,
            photo_profile
        });

        return res.status(200).json({
            message: 'success',
            data: {
                name: update_name,
                photo_profile_url: photo_profile_url
            }
        });
    } catch (error) {
        logger.error({ message: 'error ControllerUpdateUserByAccountId', error });
        return handleError({ error, res });
    }

}