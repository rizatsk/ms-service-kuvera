import { NextFunction, Request, Response } from "express";
import { addSpendCategorySchema, changeNameCategorySchema, changeStatusCategorySchema } from "./schema";

export const addSpendCategoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = addSpendCategorySchema.validate(req.body || {});

    if (result.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            error: result.error.details[0]?.message,
        });
    };

    next();
};

export const changeStatuspendCategoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = changeStatusCategorySchema.validate(req.body || {});

    if (result.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            error: result.error.details[0]?.message,
        });
    };

    next();
};

export const changeNameSpendCategoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = changeNameCategorySchema.validate(req.body || {});

    if (result.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            error: result.error.details[0]?.message,
        });
    };

    next();
};