import dotenv from 'dotenv';
dotenv.config();

const Environment = {
    SERVICE_NAME: process.env.SERVICE_NAME || 'ms_service_kuvera',
    LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug',
    DEBUG: process.env.DEBUG || 'not-active',
    BASE_URL: process.env.BASE_URL || '',

    URL_API_IHSG: process.env.URL_IHSG || 'https://localhost/ihsg',
    URL_API_ANTAM: process.env.URL_ANTAM || 'https://localhost/antam',

    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,

    URL_AUTH_GOOGLE: process.env.URL_AUTH_GOOGLE || 'https://google',

    DB_PG_HOST: process.env.DB_PG_HOST || 'localhost',
    DB_PG_PORT: process.env.DB_PG_PORT || 5432,
    DB_PG_USERNAME: process.env.DB_PG_USERNAME || 'root',
    DB_PG_PASSWORD: process.env.DB_PG_PASSWORD || '',
    DB_PG_NAME: process.env.DB_PG_NAME || 'ms_service_kuvera',

    ENCRYPT_KEY: process.env.ENCRYPT_KEY || '',
    ENCRYPT_KEY_IV: process.env.ENCRYPT_KEY_IV || '',
    ALGORITHM_ENCRYPT: process.env.ALGORITHM_ENCRYPT || '',

    MAX_DEVICE_LOGIN: parseInt(process.env.MAX_DEVICE_LOGIN || '1'),
    SECRET_TOKEN_JWT: process.env.SECRET_TOKEN_JWT || '',
    PRIVATE_KEY_JWT: process.env.PRIVATE_KEY_JWT || '',
    PUBLIC_KEY_JWT: process.env.PUBLIC_KEY_JWT || '',
}

export default Environment;
