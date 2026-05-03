import { Request, Response, NextFunction } from 'express';
import aiService from '../services/aiService';
import electionDataService from '../services/electionDataService';
import logger from '../config/logger';
import { sanitizeInput } from '../utils/validation';
import { asyncHandler, createError } from '../middleware/errorHandler';

/**
 * Send chat message and get AI response
 */
export const sendMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { message, userId, sessionId } = req.body;

    if (!message || !userId) {
      return next(createError('Missing required fields', 400));
    }

    try {
      // Sanitize input
      const sanitizedMessage = sanitizeInput(message);

      // Get AI response
      const response = await aiService.chat(userId, sanitizedMessage);

      // Save interaction
      await electionDataService.saveUserProgress(userId, {
        type: 'chat',
        message: sanitizedMessage,
        response,
        sessionId,
      });

      logger.info(`Chat message processed for user ${userId}`);

      res.status(200).json({
        success: true,
        data: {
          message: sanitizedMessage,
          response,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      logger.error(`Error in sendMessage: ${error}`);
      next(createError('Unable to process message', 500));
    }
  }
);

/**
 * Search FAQ
 */
export const searchFAQ = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      return next(createError('Query parameter is required', 400));
    }

    try {
      const results = aiService.searchFAQ(query);

      res.status(200).json({
        success: true,
        data: {
          query,
          results,
          count: results.length,
        },
      });
    } catch (error) {
      logger.error(`Error in searchFAQ: ${error}`);
      next(createError('Unable to search FAQ', 500));
    }
  }
);

/**
 * Clear conversation history
 */
export const clearHistory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    if (!userId) {
      return next(createError('Missing userId', 400));
    }

    try {
      aiService.clearHistory(userId);

      res.status(200).json({
        success: true,
        message: 'Conversation history cleared',
      });
    } catch (error) {
      logger.error(`Error in clearHistory: ${error}`);
      next(createError('Unable to clear history', 500));
    }
  }
);
