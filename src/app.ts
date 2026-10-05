import express, { Application, Request, Response } from 'express';
import carRoutes from './routes/cars';
import { env } from './config/env';
import { connectDB } from './config/database';
//import { authenticateKey } from './middleware/auth.middleware';
import { logRequest } from './middleware/logging.middleware';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

const PORT = env.port;
const app: Application = express();

app.use(express.json());
app.use(logRequest);
app.use('/api/v1/cars',  carRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.get('/ping', async (_req: Request, res: Response) => {
  res.json({ message: 'S00272372 Artem Domashenko' });
});

app.get('/bananas', async (_req: Request, res: Response) => {
  res.json({ message: 'this is bananas' });
});

app.get('/cars', async (_req: Request, res: Response) => {
  res.json({ message: 'this is cars' });
});

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port fdasfsaf${PORT}`);
  });
};

startServer();
