import { Request, Response, NextFunction } from 'express';
import electionDataService from '../services/electionDataService';
import logger from '../config/logger';
import { asyncHandler, createError } from '../middleware/errorHandler';

/**
 * Get all election steps
 */
export const getAllSteps = asyncHandler(
  async (_req: Request,res: Response, next: NextFunction) => {
    try {
      const steps = await electionDataService.getAllElectionSteps();

      res.status(200).json({
        success: true,
        data: steps,
        count: steps.length,
      });
    } catch (error) {
      logger.error(`Error in getAllSteps: ${error}`);
      next(createError('Unable to fetch election steps', 500));
    }
  }
);

/**
 * Get specific election step
 */
export const getStep = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { stepId } = req.params;

    if (!stepId) {
      return next(createError('Step ID is required', 400));
    }

    try {
      const step = await electionDataService.getElectionStep(stepId);

      if (!step) {
        return next(createError('Election step not found', 404));
      }

      res.status(200).json({
        success: true,
        data: step,
      });
    } catch (error) {
      logger.error(`Error in getStep: ${error}`);
      next(createError('Unable to fetch election step', 500));
    }
  }
);

/**
 * Get election timeline
 */
export const getTimeline = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const timeline = await electionDataService.getElectionTimeline();

      res.status(200).json({
        success: true,
        data: timeline,
      });
    } catch (error) {
      logger.error(`Error in getTimeline: ${error}`);
      next(createError('Unable to fetch election timeline', 500));
    }
  }
);

/**
 * Get FAQ
 */
export const getFAQ = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const faq = await electionDataService.getFAQ();

      res.status(200).json({
        success: true,
        data: faq,
        count: faq.length,
      });
    } catch (error) {
      logger.error(`Error in getFAQ: ${error}`);
      next(createError('Unable to fetch FAQ', 500));
    }
  }
);

/**
 * Get polling booths
 */
export const getPollingBooths = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { state, city } = req.query;

    if (!state || !city) {
      return next(createError('State and city parameters are required', 400));
    }

    try {
      const booths = await electionDataService.searchPollingBooths(
        state as string,
        city as string
      );

      res.status(200).json({
        success: true,
        data: booths,
      });
    } catch (error) {
      logger.error(`Error in getPollingBooths: ${error}`);
      next(createError('Unable to fetch polling booths', 500));
    }
  }
);

/**
 * Get election statistics
 */
export const getStatistics = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await electionDataService.getElectionStatistics();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      logger.error(`Error in getStatistics: ${error}`);
      next(createError('Unable to fetch statistics', 500));
    }
  }
);
