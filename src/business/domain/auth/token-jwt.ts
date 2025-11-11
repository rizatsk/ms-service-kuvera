import * as jwt from 'jsonwebtoken';
import logger from "../../../config/logger";
import { GenerateTokenJwtParam } from "./type";
import Environment from '../../../helper/constan/environment';


export function generateTokenJwt(hash: GenerateTokenJwtParam): string {
  try {
    const secret = Environment.SECRET_TOKEN_JWT;
    const privateKey = Environment.PRIVATE_KEY_JWT;

    const options = {
      issuer: 'rjshub',
      expiresIn: 3600,
      algorithm: 'RS256' as jwt.Algorithm,
    };
    const token = jwt.sign(
      hash,
      {
        key: privateKey,
        passphrase: secret,
      },
      options,
    );
    return token;
  } catch (error) {
    logger.error({ message: 'Error generate token jwt', error });
    throw error;
  }
}