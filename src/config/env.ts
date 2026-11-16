
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required')
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('Environment validation failed');
  console.error(result.error.issues);
  process.exit(1);
}

export const env = {
  port: result.data.PORT,
  nodeEnv: result.data.NODE_ENV,
  mongodbUri: result.data.MONGODB_URI
};
