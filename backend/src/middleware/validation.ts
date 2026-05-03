import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { createError } from './errorHandler';

/**
 * Middleware to validate request body
 */
export const validateBody =
  (schema: Schema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return next(createError(messages.join(', '), 400));
    }

    req.body = value;
    next();
  };

/**
 * Middleware to validate query parameters
 */
export const validateQuery =
  (schema: Schema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return next(createError(messages.join(', '), 400));
    }

    req.query = value;
    next();
  };
