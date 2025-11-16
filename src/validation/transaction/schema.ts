import Joi from "joi";

export const addTransactionSchema = Joi.object({
    category_id: Joi.string().max(50).required(),
    money_spent: Joi.number().min(100).required(),
    notes: Joi.string().max(150),
    type: Joi.string().valid('incoming', 'outgoing').required(),
    created_dt: Joi.date().max('now').required()
});

export const editTransactionSchema = Joi.object({
    id_transaction: Joi.string().max(50).required(),
    category_id: Joi.string().max(50).required(),
    money_spent: Joi.number().min(100).required(),
    notes: Joi.string().max(150),
    type: Joi.string().valid('incoming', 'outgoing').required(),
    created_dt: Joi.date().max('now').required()
});