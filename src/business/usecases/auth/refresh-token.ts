import uuidGen from "../../../config/uuid";
import { decyptCredentials, encryptCredentials } from "../../domain/auth/credential";
import { generateTokenJwt } from "../../domain/auth/token-jwt";
import { addSessionAuth, deleteSessionAuthById, getSessionAuthById } from "../../repositories/session_auth";

async function usecasesRefreshToken(token: string) {
    // Decrypt token
    const idAuth = uuidGen();
    const decyptToken = decyptCredentials(token);

    // Get token
    const result = await getSessionAuthById(decyptToken.id);

    // Check token is exist
    if (!result) throw '40101';

    // Delete token old
    await deleteSessionAuthById(decyptToken.id);

    const createdAtToken = new Date(result.created_dt);
    const timeNow = new Date();
    const timeLater = new Date(
        createdAtToken.getTime() + 7 * 24 * 60 * 60 * 1000,
    ); // 7 Hari

    if (timeNow >= timeLater) {
        throw '40101'
    }

    const newRefreshToken = encryptCredentials({
        id: idAuth,
        account_id: decyptToken.account_id,
        email: decyptToken.email,
    });

    // Create token
    await addSessionAuth({
        id: idAuth,
        account_id: decyptToken.account_id,
        token: newRefreshToken,
    });

    // Generate accessToken
    const accessToken = generateTokenJwt({ oat: newRefreshToken });

    return {
        refreshToken: newRefreshToken,
        accessToken,
    }
};

export default usecasesRefreshToken;
