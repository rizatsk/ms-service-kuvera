import dotenv from 'dotenv';
dotenv.config();

const Environment = {
    URL_API_IHSG: process.env.URL_IHSG || 'https://localhost/ihsg',
    URL_API_ANTAM: process.env.URL_ANTAM || 'https://localhost/antam',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || 6379,
}

export default Environment;
