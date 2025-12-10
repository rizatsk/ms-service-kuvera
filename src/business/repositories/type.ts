import { changeStatusCategorySpend } from "./category_spend"

export type DomainAddAccountProps = {
    email: string,
    name: string,
    photo_profile: string
}

export type AddSessionAuthParam = {
    account_id: string, 
    token: string, 
    id: string
}

export type ChangeStatusCategorySpendParam = {
    id: string, 
    status: boolean, 
    account_id: string
}

export type TypeTransaction = 'incoming' | 'outgoing';

export type AddTransactionParam = {
    account_id: string
    category_id: string
    money_spent: number
    notes?: string
    type: TypeTransaction
    created_dt: Date
}

export type EditTransactionParam = {
    account_id: string
    id_transaction: string
    category_id: string
    money_spent: number
    notes?: string
    type: TypeTransaction
    created_dt: Date
};

export type GetTransactionByAccountIdParam = {
    account_id: string,
    type: TypeTransaction | 'all',
    limit?: number,
    start_date?: string,
    end_date?: string
}

export type CategoryType = {
    id: string
    name: string
    status: boolean
}

export type TransactionType = {
    id: string,
    account_id: string,
    category_id: string,
    category_name: string,
    money_spent: number,
    notes: string,
    type: TypeTransaction,
    created_dt: Date,
}

export type GetSumerizeTransactionByAccountIdParam = {
    account_id: string, 
    type: TypeTransaction | 'all', 
    start_date: Date, 
    end_date: Date
}

export type GetTransactionsByCategoryParam = {
    account_id: string, 
    category_id: string, 
    start_date: Date, 
    end_date: Date
}

export type ChangeNameCategorySpendParam = {
    account_id: string
    category_id: string
    category_name: string
}

export type UpdateUserByAccountIdParam = {
    account_id: string
    name?: string | null
    photo_profile_url?: string | null
}

export type AccountType = {
    name: string
    email: string
    photo_profile_url: string | null
    created_dt: Date
    updated_dt: Date | null
}