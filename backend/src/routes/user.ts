import express from 'express';
import { savePreferences, getPreferences, getProgress } from '../controllers/userController';
import { validateBody } from '../middleware/validation';
import { userPreferencesSchema } from '../utils/validation';

const router = express.Router();

/**
 * POST /api/user/preferences
 * Save user preferences
 */
router.post('/preferences', validateBody(userPreferencesSchema), savePreferences);

/**
 * GET /api/user/preferences/:userId
 * Get user preferences
 */
router.get('/preferences/:userId', getPreferences);

/**
 * GET /api/user/progress/:userId
 * Get user progress
 */
router.get('/progress/:userId', getProgress);

export default router;
