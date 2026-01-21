import { Router } from 'express';
import {
    getSettings,
    updateSetting,
    getSettingByKey,
} from '../controllers/setting.controller';
import { authenticate, authorizeRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getSettings);
router.get('/:key', getSettingByKey);

// Admin only routes
router.post('/', authenticate, authorizeRole('ADMIN'), updateSetting);

export default router;
