import express from 'express';
import { sendMessage, searchFAQ, clearHistory } from '../controllers/chatController';
import { validateBody } from '../middleware/validation';
import { chatMessageSchema } from '../utils/validation';

const router = express.Router();

/**
 * POST /api/chat/message
 * Send a chat message and get AI response
 */
router.post('/message', validateBody(chatMessageSchema), sendMessage);

/**
 * GET /api/chat/faq
 * Search FAQ
 */
router.get('/faq', searchFAQ);

/**
 * POST /api/chat/clear-history
 * Clear conversation history
 */
router.post('/clear-history', clearHistory);

export default router;
