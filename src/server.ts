'use strict';

import dotenv from 'dotenv';
import app from "./app";

// Muat variabel lingkungan dari file .env
dotenv.config();

const PORT = process.env.PORT || 3000;

// Mulai server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});