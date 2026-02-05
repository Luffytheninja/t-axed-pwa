import express from 'express';

const router = express.Router();

// Error handling middleware
export const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Resource not found',
      error: process.env.NODE_ENV === 'production' ? {} : err.message,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate field value entered',
      error: process.env.NODE_ENV === 'production' ? {} : err.message,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val: any) => val.message);
    return res.status(400).json({
      message: 'Validation Error',
      error: errors,
    });
  }

  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
};

// 404 handler
export const notFound = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default router;