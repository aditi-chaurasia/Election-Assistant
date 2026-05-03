import dotenv from 'dotenv';

// Load environment variables BEFORE any other imports
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import logger from './config/logger';
import { errorHandler } from './middleware/errorHandler';

// Routes
import chatRoutes from './routes/chat';
import electionRoutes from './routes/election';
import userRoutes from './routes/user';

const app: Express = express();
const port = process.env.PORT || 5000;

/**
 * Security Middleware
 */
app.use(helmet()); // Set security HTTP headers

/**
 * CORS Configuration
 */
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

/**
 * Rate Limiting
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});
app.use(limiter);

/**
 * Logging Middleware
 */
app.use(morgan('combined', { stream: { write: (msg: string) => logger.info(msg) } }));

/**
 * Body Parser Middleware
 */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

/**
 * Health Check Endpoint
 */
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

/**
 * Root Endpoint
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running 🚀');
});

/**
 * API Routes
 */
app.use('/api/chat', chatRoutes);
app.use('/api/election', electionRoutes);
app.use('/api/user', userRoutes);

/**
 * 404 Handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.path} not found`,
  });
});

/**
 * Global Error Handler
 */
app.use(errorHandler);

/**
 * Start Server
 */
const server = app.listen(port, () => {
  logger.info(`Election Assistant Backend running on port ${port}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

/**
 * Graceful Shutdown
 */
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Closing HTTP server...');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export default app;
