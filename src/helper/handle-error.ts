import { Response } from "express";

type HandleErrorType = {
    error: any
    res: Response
    statusCode?: number
}

const handleError = ({error, res, statusCode = 40400}: HandleErrorType) => {
    if (typeof error === 'string') {
        return res.status(400).json({
            message: 'bad request',
            status_code: statusCode
        })
    } else {
        return res.status(500).json({
            message: 'internal server error',
            status_code: 50500
        })
    }
}

export default handleError;
