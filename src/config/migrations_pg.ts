import dotenv from 'dotenv';
dotenv.config();

const config_migrations = {
  development: {
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_NAME,
    host: process.env.DB_PG_HOST,
    port: process.env.DB_PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // Optional
    },
    timezone: '+07:00', // Optional
  },
};

export default config_migrations;

