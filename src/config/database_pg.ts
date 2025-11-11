
import { Sequelize } from "sequelize-typescript";
import Environment from "../helper/constan/environment";
import { Account } from "../models/account";
import { User } from "../models/user";
import { SessionAuth } from "../models/session_auth";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: Environment.DB_PG_HOST,
    port: Environment.DB_PG_PORT as number,
    username: Environment.DB_PG_USERNAME,
    password: Environment.DB_PG_PASSWORD,
    database: Environment.DB_PG_NAME,
    models: [Account, User, SessionAuth],
    logging: false, // matikan log query di console
});