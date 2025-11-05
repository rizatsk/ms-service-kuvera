import dotenv from 'dotenv';
dotenv.config();

const Environment = {
    URL_API_IHSG: process.env.URL_IHSG || 'https://localhost/ihsg',
    URL_API_ANTAM: process.env.URL_ANTAM || 'https://localhost/antam',
}

export default Environment;
