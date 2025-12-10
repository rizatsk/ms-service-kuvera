import { NextFunction, Request, Response } from "express";
import { photoProfileSchema, updateUserByAccountIdSchema } from "./schema";

export const updateUserByAccountIdValidation = (req: Request, res: Response, next: NextFunction) => {
    const result = updateUserByAccountIdSchema.validate(req.body || {});
    const resultPhoto = req.file ? photoProfileSchema.validate(req.file) : { error: null };

    if (result.error || resultPhoto.error) {
        // Tangani kesalahan validasi
        return res.status(400).json({
            code: '40001',
            error: result.error?.details[0]?.message ? result.error.details[0].message : resultPhoto.error?.details[0]?.message,
        });
    };

    next();
};
