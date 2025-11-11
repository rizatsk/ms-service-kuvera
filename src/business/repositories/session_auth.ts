import { SessionAuth } from "../../models/session_auth";
import { AddSessionAuthParam } from "./type";

export async function getSessionAuthByAccountId(account_id: string): Promise<{ id: string }[] | []> {
    const auths = await SessionAuth.findAll({
        raw: true,
        where: {
            account_id,
        },
        attributes: ['id'],
        order: [['created_dt', 'ASC']],
    })

    return auths;
}

export async function addSessionAuth({account_id, token, id}: AddSessionAuthParam) {
    const sessionAuth = await SessionAuth.create({
        id: id,
        account_id,
        token,
    });

    return sessionAuth;
}

export async function deleteSessionAuthById(id: string) {
    await SessionAuth.destroy({
        where: {
            id,
        },
    });
}
