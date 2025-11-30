import Environment from "../helper/constan/environment";

const config_migrations = {
  development: {
    username: Environment.DB_PG_USERNAME,
    password: Environment.DB_PG_PASSWORD,
    database: Environment.DB_PG_NAME,
    host: Environment.DB_PG_HOST,
    port: Environment.DB_PG_PORT,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // Optional
    },
    timezone: '+07:00', // Optional
  },
};

export default config_migrations;

