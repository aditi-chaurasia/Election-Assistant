import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export interface CustomError extends Error {
  status?: number;
  message: string;
}

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error - ${status}: ${message}`);

  // Don't expose sensitive error details in production
  const errorResponse =
    process.env.NODE_ENV === 'production'
      ? { success: false, message: 'An error occurred' }
      : { success: false, message, error: err };

  res.status(status).json(errorResponse);
};

/**
 * Create custom error
 */
export const createError = (message: string, status: number = 500): CustomError => {
  const error = new Error(message) as CustomError;
  error.status = status;
  return error;
};

/**
 * Async handler wrapper to catch errors in async routes
 */
export const asyncHandler =
  (fn: (req: Request, _res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
