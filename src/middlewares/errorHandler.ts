import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import CustomError from '../errors/CustomError';

const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  console.error(err);
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal error' });
};

export default errorHandler;