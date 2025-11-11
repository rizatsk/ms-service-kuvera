export type GenerateTokenParams = {
    account_id: string;
    email: string;
};

export type GenerateTokenResult = {
    token_id: string;
    accessToken: string;
    refreshToken: string;
}

export type EncryptCredentialParam = {
    id: string;
    account_id: string;
    email: string;
}

export type GenerateTokenJwtParam = {
  oat: string;
};
