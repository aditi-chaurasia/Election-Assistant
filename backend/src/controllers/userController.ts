import { Request, Response, NextFunction } from 'express';
import electionDataService from '../services/electionDataService';
import logger from '../config/logger';
import { asyncHandler, createError } from '../middleware/errorHandler';

/**
 * Save user preferences
 */
export const savePreferences = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, state, language, accessibility } = req.body;

    if (!userId) {
      return next(createError('User ID is required', 400));
    }

    try {
      const preferences = {
        state,
        language,
        accessibility,
      };

      await electionDataService.saveUserPreferences(userId, preferences);

      res.status(200).json({
        success: true,
        message: 'Preferences saved successfully',
        data: preferences,
      });
    } catch (error) {
      logger.error(`Error in savePreferences: ${error}`);
      next(createError('Unable to save preferences', 500));
    }
  }
);

/**
 * Get user preferences
 */
export const getPreferences = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
      return next(createError('User ID is required', 400));
    }

    try {
      const preferences = await electionDataService.getUserPreferences(userId);

      res.status(200).json({
        success: true,
        data: preferences || {},
      });
    } catch (error) {
      logger.error(`Error in getPreferences: ${error}`);
      next(createError('Unable to fetch preferences', 500));
    }
  }
);

/**
 * Get user progress
 */
export const getProgress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!userId) {
      return next(createError('User ID is required', 400));
    }

    try {
      const progress = await electionDataService.getUserProgress(userId);

      res.status(200).json({
        success: true,
        data: progress,
        count: progress.length,
      });
    } catch (error) {
      logger.error(`Error in getProgress: ${error}`);
      next(createError('Unable to fetch progress', 500));
    }
  }
);
