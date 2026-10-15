
import {
  ErrorRequestHandler
} from 'express';
import { ZodError } from 'zod';
import { NotFoundError } from '../errors/NotFoundError';

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  if (error instanceof NotFoundError) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      status: 'fail',
      message: 'Validation failed',
      errors: error.issues
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};
