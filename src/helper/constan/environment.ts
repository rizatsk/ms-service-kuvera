import dotenv from 'dotenv';
dotenv.config();

const Environment = {
    SERVICE_NAME: process.env.SERVICE_NAME || 'ms_service_kuvera',
    LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug',
    
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
}

export default Environment;
