import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import loadRoutes from './routes';

const app = express();

// Middleware untuk mengurai body JSON dari request
app.use(express.json());
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Invalid JSON payload",
    });
  }
  next();
});

loadRoutes(app);

export default app;