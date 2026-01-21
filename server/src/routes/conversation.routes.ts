import { Router } from 'express';
import {
    getAllConversations,
    createConversation,
    updateConversation,
    deleteConversation,
} from '../controllers/conversation.controller';
import { authenticate, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllConversations);

// Admin only routes
router.post('/', authenticate, authorizeRole('ADMIN'), createConversation);
router.put('/:id', authenticate, authorizeRole('ADMIN'), updateConversation);
router.delete('/:id', authenticate, authorizeRole('ADMIN'), deleteConversation);

export default router;
