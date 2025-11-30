import Joi from "joi";

export const addSpendCategorySchema = Joi.object({
    name_category: Joi.string().min(3).max(50).required(),
});

export const changeStatusCategorySchema = Joi.object({
    category_id: Joi.string().max(50).required(),
    status: Joi.boolean().required(),
});

export const changeNameCategorySchema = Joi.object({
    category_id: Joi.string().max(50).required(),
    category_name: Joi.string().min(3).max(50).required(),
});