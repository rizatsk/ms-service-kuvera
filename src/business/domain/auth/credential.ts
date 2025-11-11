import logger from "../../../config/logger";
import Environment from "../../../helper/constan/environment";
import { EncryptCredentialParam } from "./type";
import * as crypto from "crypto";

export function encryptCredentials(data: EncryptCredentialParam): string {
  const key = Buffer.from(Environment.ENCRYPT_KEY, 'hex'),
    iv = Buffer.from(Environment.ENCRYPT_KEY_IV, 'hex');

  const dataToEncrypt = {
    ...data,
    created_dt: new Date(),
  };
  const cipher = crypto.createCipheriv(Environment.ALGORITHM_ENCRYPT, key, iv);
  let encrypted = cipher.update(JSON.stringify(dataToEncrypt), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export function decyptCredentials(data: string): EncryptCredentialParam {
  try {
    const key = Buffer.from(Environment.ENCRYPT_KEY, 'hex'),
      iv = Buffer.from(Environment.ENCRYPT_KEY_IV, 'hex');

    const decipher = crypto.createDecipheriv(
      Environment.ALGORITHM_ENCRYPT,
      key,
      iv,
    );

    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch (error) {
    logger.error({ message: 'Error decrypt', error });
    throw '40103';
  }
}