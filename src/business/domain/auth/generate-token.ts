import uuidGen from "../../../config/uuid";
import { encryptCredentials } from "./credential";
import { generateTokenJwt } from "./token-jwt";
import { GenerateTokenParams, GenerateTokenResult } from "./type";

export function generateToken({account_id, email}: GenerateTokenParams): GenerateTokenResult {
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