
import { ErrorRequestHandler } from 'express';
import { AppError, ValidationError } from '../apperrors';
import { NotFoundError } from '../errors/NotFoundError';

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  if (error instanceof ValidationError) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.details
    });
    return;
  }

  if (error instanceof NotFoundError || error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: 'Server Error'
  });
};
