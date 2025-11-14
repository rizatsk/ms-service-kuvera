import { Response } from "express";
import errorCode from "./error-code";

type HandleErrorType = {
    error: any
    res: Response
    statusCode?: string
}

const handleError = ({ error, res }: HandleErrorType) => {
    if (typeof error === 'string') {
        if (error === "40101" || error === "40104" || error === "40102") {
            return res.status(401).json({
                message: 'unauthenticated',
                status_code: error,
            })
        };

        return res.status(400).json({
            message: 'bad request',
            status_code: error,
            error: errorCode[error],
        })
    } else {
        return res.status(500).json({
            message: 'internal server error',
            status_code: 50500
        })
    }
}

export default handleError;
