'use strict';

import dotenv from 'dotenv';
import app from "./app";
import { sequelize } from './config/database_pg';
import logger from './config/logger';

// Muat variabel lingkungan dari file .env
dotenv.config();

const PORT = process.env.PORT || 3000;

// Mulai server
app.listen(PORT, () => {
  // connect db
  sequelize.sync({ alter: false })
    .then(() => logger.info("Database connected & synced!"))
    .catch((err) => logger.error({ message: "Database error", error: err }));

  logger.info(`Server is running at PORT: ${PORT}`);
});