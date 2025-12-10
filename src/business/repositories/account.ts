import { CreationAttributes, QueryTypes } from "sequelize";
import uuidGen from "../../config/uuid";
import { Account } from "../../models/account";
import { AccountType, DomainAddAccountProps, UpdateUserByAccountIdParam } from "./type";
import { User } from "../../models/user";
import { sequelize } from "../../config/database_pg";

export async function getAccountByEmail(email: string) {
    const account = await Account.findOne({
        raw: true,
        attributes: ['id', 'email'],
        where: {
            email,
        },
    });

    return account;
}

export async function addAccount({
    email, name, photo_profile
}: DomainAddAccountProps) {
    const account_id = uuidGen();

    await Account.create({
        id: account_id,
        email: email,
    });

    await User.create({
        id: uuidGen(),
        account_id: account_id,
        name: name.trim(),
        photo_profile_url: photo_profile,
    })

    return {
        account_id,
        email
    };
}

export async function getDataAccountGraphQl(account_id: string): Promise<AccountType> {
    const [results] = await sequelize.query(
        `SELECT name, email, photo_profile_url, created_dt, updated_dt 
          FROM accounts
          JOIN users ON accounts.id = users.account_id
          WHERE accounts.id = :id`,
        {
            replacements: { id: account_id },
            type: QueryTypes.SELECT,
        }
    );

    return results as AccountType;
}

export async function updateUserByAccountId({
    account_id,
    name = null,
    photo_profile_url
}: UpdateUserByAccountIdParam) {
    let update_data = {};

    if (name !== null) {
        update_data = { ...update_data, name };
    }

    if (photo_profile_url !== null) {
        update_data = { ...update_data, photo_profile_url };
    }

    await User.update(
        { ...update_data },
        {
            where: {
                account_id,
            },
        }
    );
}