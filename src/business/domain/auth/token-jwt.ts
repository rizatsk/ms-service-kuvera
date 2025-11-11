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

export function verifyTokenJwt(token: string): string {
  try {
    const publicKey = Environment.PUBLIC_KEY_JWT;

    const options = {
      issuer: 'rjshub',
      algorithms: ['RS256'] as jwt.Algorithm[],
    };

    const userToken = jwt.verify(token, publicKey, options) as GenerateTokenJwtParam;
    return userToken['oat'];
  } catch (error) {
    logger.error({ message: 'Error verify jwt token', error });
    throw error;
  }
}