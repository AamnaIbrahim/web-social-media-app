import multer from 'multer';
import { env } from '../config/env.js';

export function errorHandler(err, req, res, next) {

  if (err instanceof multer.MulterError) {
    let message = 'Upload failed. Please try again.';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = err.field === 'avatar'
        ? 'Image must be under 2MB'
        : 'Each image must be under 5MB';
    } else if (err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Too many images — up to 4 allowed per post';
    }
    return res.status(400).json({ success: false, message });
  }

  const statusCode = err.statusCode ?? 500;
  const message = err.isOperational ? err.message : 'Something went wrong. Please try again.';

  if (!err.isOperational && !(err instanceof multer.MulterError)) {
    console.error('[error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.isProduction ? {} : { stack: err.stack }),
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}