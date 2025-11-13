import { NextFunction, Request, Response } from "express";
import { addSpendCategorySchema } from "./schema";

export const addSpendCategoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = addSpendCategorySchema.validate(req.body || {});

    if (result.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            errors: result.error.details,
        });
    };

    next();
};