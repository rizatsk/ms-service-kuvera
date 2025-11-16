import { NextFunction, Request, Response } from "express";
import { addTransactionSchema, editTransactionSchema } from "./schema";

export const addTransactionValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = addTransactionSchema.validate(req.body || {});

    if (result.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            error: result.error.details[0]?.message,
        });
    };

    next();
};

export const editTransactionValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = editTransactionSchema.validate(req.body || {});

    if (result.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            error: result.error.details[0]?.message,
        });
    };

    next();
};