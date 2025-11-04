'use strict';

import app from "./app";
import dotenv from 'dotenv';
import loadRoutes from "./routes";

// Muat variabel lingkungan dari file .env
dotenv.config();

const PORT = process.env.PORT || 3000;

// Mulai server
app.listen(PORT, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
});