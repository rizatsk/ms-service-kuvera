'use strict';

import dotenv from 'dotenv';
import app from "./app";
import { sequelize } from './config/database_pg';
import logger from './config/logger';
import serverGraphql from './graphql';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@as-integrations/express5';

// Muat variabel lingkungan dari file .env
dotenv.config();

const PORT = process.env.PORT || 3000;

// Mulai server
app.listen(PORT, async () => {
  // Run Graphql
  await serverGraphql.start();
  app.use(
    cors(),
    express.json(),
    expressMiddleware(serverGraphql, {
      context: async ({ req }) => ({ req }),
    }),
  );

  // connect db
  sequelize.sync({ alter: false,  force: false })
    .then(() => logger.info("Database connected & synced!"))
    .catch((err) => logger.error({ message: "Database error", error: err }));

  logger.info(`Server is running at PORT: ${PORT}`);
});