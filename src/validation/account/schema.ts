import Joi from "joi";

export const updateUserByAccountIdSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional().allow(null),
});

export const photoProfileSchema = Joi.object({
    mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/jpg", "image/webp")
        .required(),
    size: Joi.number()
        .max(100 * 1024) // 100 KB
        .required()
}).optional().allow(null).unknown(true); // Allow other file properties