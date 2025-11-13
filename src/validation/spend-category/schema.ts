import Joi from "joi";

export const addSpendCategorySchema = Joi.object({
    name_category: Joi.string().min(3).max(50).required(),
});