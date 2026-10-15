import express, { Application, Request, Response } from 'express';
import carRoutes from './routes/cars';
import { logRequest } from './middleware/logging.middleware';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import { errorMiddleware } from './middleware/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(logRequest);

app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

app.use('/api/v1/cars', carRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(errorMiddleware);

export default app;
