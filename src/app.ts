import express from 'express';
import loadRoutes from './routes';

const app = express();

// Middleware untuk mengurai body JSON dari request
app.use(express.json());
loadRoutes(app);

export default app;