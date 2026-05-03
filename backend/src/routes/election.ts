import express from 'express';
import {
  getAllSteps,
  getStep,
  getTimeline,
  getFAQ,
  getPollingBooths,
  getStatistics,
} from '../controllers/electionController';

const router = express.Router();

/**
 * GET /api/election/steps
 * Get all election steps
 */
router.get('/steps', getAllSteps);

/**
 * GET /api/election/steps/:stepId
 * Get specific election step
 */
router.get('/steps/:stepId', getStep);

/**
 * GET /api/election/timeline
 * Get election timeline
 */
router.get('/timeline', getTimeline);

/**
 * GET /api/election/faq
 * Get FAQ
 */
router.get('/faq', getFAQ);

/**
 * GET /api/election/polling-booths
 * Get polling booths (requires state and city query params)
 */
router.get('/polling-booths', getPollingBooths);

/**
 * GET /api/election/statistics
 * Get election statistics
 */
router.get('/statistics', getStatistics);

export default router;
