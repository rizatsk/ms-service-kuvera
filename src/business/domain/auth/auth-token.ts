import logger from "../../../config/logger";
import uuidGen from "../../../config/uuid";
import { decyptCredentials, encryptCredentials } from "./credential";
import { generateTokenJwt, verifyTokenJwt } from "./token-jwt";
import { EncryptCredentialParam, GenerateTokenParams, GenerateTokenResult } from "./type";

export function generateAuthToken({ account_id, email }: GenerateTokenParams): GenerateTokenResult {
  // Encrypt credentials
  const token_id = uuidGen();
  const encryptAndRefreshToken = encryptCredentials({
    id: token_id,
    account_id: account_id,
    email: email,
  });

  // Genereate accessToken
  const accessToken = generateTokenJwt({ oat: encryptAndRefreshToken });

  return {
    accessToken,
    refreshToken: encryptAndRefreshToken,
    token_id,
  }
}

export function verifyAuthToken(token: string): EncryptCredentialParam {
  try {
    const userToken = verifyTokenJwt(token);
    const decryptToken = decyptCredentials(userToken);

    return decryptToken
  } catch (error) {
    logger.error({message: 'Error verify token auth', error});
    throw '40101';
  }
}
