import Environment from "../../../helper/constan/environment";
import { addSessionAuth, deleteSessionAuthById, getSessionAuthByAccountId, getSessionAuthById } from "../../repositories/session_auth";
import { generateAuthToken, verifyAuthToken } from "./auth-token";
import { EncryptCredentialParam } from "./type";

export async function saveAndGenereateToken(account_id: string, email: string) {
    // Get session auths
    const session_auths = await getSessionAuthByAccountId(account_id);

    // Genereate accessToken
    const { accessToken, refreshToken, token_id } = generateAuthToken({
        account_id: account_id as string,
        email: email,
    });

    // Create auth in Mongo
    await addSessionAuth({
        account_id: account_id as string,
        token: refreshToken,
        id: token_id,
    });

    // TODO: If auths is 3, delete auth last login
    const maxDeviceLogin = Environment.MAX_DEVICE_LOGIN;
    if (session_auths.length >= maxDeviceLogin) {
        const idToDelete = session_auths[0]?.id;
        if (idToDelete) {
            await deleteSessionAuthById(idToDelete);
        }
    }

    return {
        accessToken,
        refreshToken,
    }
}

export async function validateSessionAuthToken(token: string): Promise<EncryptCredentialParam> {
    const resultVerifyAuthToken = verifyAuthToken(token);

    // Cek is token active
    const sessionAuth = await getSessionAuthById(resultVerifyAuthToken.id);
    if (!sessionAuth) throw '40102';
    
    return resultVerifyAuthToken;
}

export async function validateSessionAuthTokenGraphQl(token: string): Promise<EncryptCredentialParam> {
  try {
    return await validateSessionAuthToken(token);
  } catch (error: any) {
    throw new Error(error);
  }
}