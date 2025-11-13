import { CreationAttributes } from "sequelize";
import uuidGen from "../../config/uuid";
import { Account } from "../../models/account";
import { DomainAddAccountProps } from "./type";
import { User } from "../../models/user";

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